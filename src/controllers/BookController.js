import { author } from "../models/Author.js";
import book from "../models/Book.js";

class BookController {
    static async getBooks(req, res) {
        try {
            const listBooks = await book.find({});
            res.status(200).json(listBooks);
        } catch (error) {
            res.status(500).json({
                message: `${error.message}`
            });
        }
    }

    static async getBook(req, res) {
        try {
            const id = req.params.id;
            const bookData = await book.findById(id);
            res.status(200).json(bookData);
        } catch (error) {
            res.status(500).json({
                message: `${error.message}`
            });
        }
    }

    static async registerBook(req, res) {
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
            res.status(500).json({
                message: `${error.message}`
            });
        }
    }

    static async updateBook(req, res) {
        try {
            const id = req.params.id;
            await book.findByIdAndUpdate(id, req.body);
            res.status(200).json({
                message: "Updated book"
            });
        } catch (error) {
            res.status(500).json({
                message: `${error.message}`
            });
        }
    }

    static async deleteBook(req, res) {
        try {
            const id = req.params.is;
            await book.findByIdAndDelete(id);
            res.status(200).json({
                message: "Deleted book"
            })
        } catch (error) {
            res.status(500).json({
                message: `${error.message}`
            });
        }
    }

    static async booksByPublisher(req, res) {
        const publisher = req.query.publisher;

        try {
            const booksByPublisher = await book.find({ publisher: publisher });
            res.status(200).json(booksByPublisher);
        } catch (error) {
            res.status(500).json({
                message: `${error.message}`
            });
        }
    }
};

export default BookController;