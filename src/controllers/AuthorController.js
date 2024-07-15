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
        res.status(404).send({message: "Autor(a) não encontrado."})
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
      await author.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        message: "Updated author"
      });
    } catch (error) {
      next(error);
    }
  }

  static deleteAuthor = async (req, res, next) => {
    try {
      const id = req.params.is;
      await author.findByIdAndDelete(id);
      res.status(200).json({
        message: "Deleted author"
      })
    } catch (error) {
      next(error);
    }
  }
};

export default AuthorController;