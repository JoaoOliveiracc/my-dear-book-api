import notFound from "../erros/notFound.js";
import { author } from "../models/Author.js";

class AuthorController {
  static getAuthors = async (req, res) => {
    try {
      const listAuthors = await author.find({});
      res.status(200).json(listAuthors);
    } catch (error) {
      res.status(500).json({
        message: `${error.message}`
      });
    }
  }

  static getAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const authorData = await author.findById(id);

      if (authorData !== null) {
        res.status(200).json(authorData);
      } else {
        next(new notFound('Id do(a) autor(a) não localizado'));
      }
    } catch (error) {
      next(error);
    }
  }

  static registerAuthor = async (req, res, next) => {
    try {
      const newAuthor = await author.create(req.body);
      res.status(201).json({
        message: "Registered successfully",
        book: newAuthor
      });
    } catch (error) {
      next(error);
    }
  }

  static updateAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const author = await author.findByIdAndUpdate(id, req.body);

      if (author !== null) {
        res.status(200).json({
          message: "Updated author"
        });
      } else {
        next(new notFound('Id do(a) autor(a)  não localizado'));
      }
    } catch (error) {
      next(error);
    }
  }

  static deleteAuthor = async (req, res, next) => {
    try {
      const id = req.params.is;
      const author = await author.findByIdAndDelete(id);

      if (author !== null) {
        res.status(200).json({
          message: "Deleted author"
        })
      } else {
        next(new notFound('Id do(a) autor(a)  não localizado'));
      }
    } catch (error) {
      next(error);
    }
  }
};

export default AuthorController;