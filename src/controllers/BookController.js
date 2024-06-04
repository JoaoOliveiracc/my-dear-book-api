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
        try {
            const newBook = await book.create(req.body);
            res.status(201).json({
                message: "Registered successfully",
                book: newBook
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
};

export default BookController;