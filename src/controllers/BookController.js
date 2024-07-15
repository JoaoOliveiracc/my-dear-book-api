import { author } from "../models/Author.js";
import book from "../models/Book.js";

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
      res.status(200).json(bookData);
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
      await book.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        message: "Updated book"
      });
    } catch (error) {
      next(error);
    }
  }

  static deleteBook = async (req, res, next) => {
    try {
      const id = req.params.is;
      await book.findByIdAndDelete(id);
      res.status(200).json({
        message: "Deleted book"
      })
    } catch (error) {
      next(error);
    }
  }

  static booksByPublisher = async (req, res, next) => {
    const publisher = req.query.publisher;

    try {
      const booksByPublisher = await book.find({ publisher: publisher });
      res.status(200).json(booksByPublisher);
    } catch (error) {
      next(error);
    }
  }
};

export default BookController;