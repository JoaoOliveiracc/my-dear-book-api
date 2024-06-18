import express from "express";
import books from "./booksRoute.js";
import authors from "./authorsRoute.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send("My dear api");
  });

  app.use(express.json(), books, authors);
};

export default routes;