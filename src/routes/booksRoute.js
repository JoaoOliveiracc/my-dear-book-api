import express from "express";
import BookController from "../controllers/BookController.js";
import paginate from "../middlewares/paginate.js";

const routes = express.Router();

routes.get("/books", BookController.getBooks, paginate);
routes.get("/books/search", BookController.booksByFilter, paginate);
routes.get("/books/:id", BookController.getBook);
routes.post("/books", BookController.registerBook);
routes.put("/books/:id", BookController.updateBook);
routes.delete("/books/:id", BookController.deleteBook);

export default routes;