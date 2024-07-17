import notFound from "../erros/notFound.js";
import { author } from "../models/index.js";
import { book } from "../models/index.js";

class BookController {
  static getBooks = async (req, res, next) => {
    try {
      const listBooks = await book.find({});
      res.status(200).json(listBooks);
    } catch (error) {
      next(error);
    }
  }

  static getBook = async (req, res, next) => {
    try {
      const id = req.params.id;
      const bookData = await book.findById(id);

      if (bookData !== null) {
        res.status(200).json(bookData);
      } else {
        next(new notFound('Id do livro não foi encontrado'));
      }
    } catch (error) {
      next(error);
    }
  }

  static registerBook = async (req, res, next) => {
    const newBook = req.body;
    try {
      const authorFound = await author.findById(newBook.author);
      const completeBook = { ...newBook, author: { ...authorFound._doc } };
      const createdBook = await book.create(completeBook);
      res.status(201).json({
        message: "Registered successfully",
        book: createdBook
      });
    } catch (error) {
      next(error);
    }
  }

  static updateBook = async (req, res, next) => {
    try {
      const id = req.params.id;
      const bookData = await book.findByIdAndUpdate(id, req.body);

      if (bookData !== null) {
        res.status(200).json({
          message: "Updated book"
        });
      } else {
        next(new notFound('Id do livro não foi encontrado'));
      }
    } catch (error) {
      next(error);
    }
  }

  static deleteBook = async (req, res, next) => {
    try {
      const id = req.params.is;
      const book = await book.findByIdAndDelete(id);

      if (book !== null) {
        res.status(200).json({
          message: "Deleted book"
        });
      } else {
        next(new notFound('Id do livro não foi encontrado'));
      }
    } catch (error) {
      next(error);
    }
  }

  static booksByFilter = async (req, res, next) => {
    const { publisher, title } = req.query;

    try {
      const booksByPublisher = await book.find({
        publisher: publisher,
        title: title
      });
      
      res.status(200).json(booksByPublisher);
    } catch (error) {
      next(error);
    }
  }
};

export default BookController;