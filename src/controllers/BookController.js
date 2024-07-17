import notFound from "../erros/notFound.js";
import { author, book } from "../models/index.js";

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
      const bookData = await book.findByIdAndDelete(id);

      if (bookData !== null) {
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
    try {
      const search = await searchProccess(req.query);

      const booksByPublisher = await book.find(search).populate('author');

      res.status(200).json(booksByPublisher);
    } catch (error) {
      next(error);
    }
  }
};

async function searchProccess(params) {
  const { publisher, title, minPag, maxPag, authorName } = params;
  const regex = new RegExp(title, 'i');
  const search = {};

  if (publisher) search.publisher = publisher;

  if (title) search.title = regex;

  if (minPag || maxPag) search.pagesNumber = {};

  if (minPag) search.pagesNumber.$gte = minPag;
  
  if (maxPag) search.pagesNumber.$lte = maxPag;

  if (authorName) {
    const authorData = await author.findOne({ name: authorName });
    const idAuthor = authorData._id;
    search.author = idAuthor;
  }

  return search;
}

export default BookController;