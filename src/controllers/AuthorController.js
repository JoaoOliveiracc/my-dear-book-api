import mongoose from "mongoose";
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

  static getAuthor = async (req, res) => {
    try {
      const id = req.params.id;
      const authorData = await author.findById(id);

      if (authorData !== null) {
        res.status(200).json(authorData);
      } else {
        res.status(404).send({message: "Autor não encontrado."})
      }
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        res.status(400).send({message: "Erro no parâmetro enviado."})
      }
      res.status(500).send({message: 'Erro interno no servidor.', error})
    }
  }

  static registerAuthor = async (req, res) => {
    try {
      const newAuthor = await author.create(req.body);
      res.status(201).json({
        message: "Registered successfully",
        book: newAuthor
      });
    } catch (error) {
      res.status(500).json({
        message: `${error.message}`
      });
    }
  }

  static updateAuthor = async (req, res) => {
    try {
      const id = req.params.id;
      await author.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        message: "Updated author"
      });
    } catch (error) {
      res.status(500).json({
        message: `${error.message}`
      });
    }
  }

  static deleteAuthor = async (req, res) => {
    try {
      const id = req.params.is;
      await author.findByIdAndDelete(id);
      res.status(200).json({
        message: "Deleted author"
      })
    } catch (error) {
      res.status(500).json({
        message: `${error.message}`
      });
    }
  }
};

export default AuthorController;