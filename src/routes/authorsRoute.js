import express from "express";
import AuthorController from "../controllers/AuthorController.js";
import paginate from "../middlewares/paginate.js";

const router = express.Router();

router
  .get("/authors", AuthorController.getAuthors, paginate)
  .get("/authors/:id", AuthorController.getAuthor)
  .post("/authors", AuthorController.registerAuthor)
  .put("/authors/:id", AuthorController.updateAuthor)
  .delete("/authors/:id", AuthorController.deleteAuthor);

export default router;