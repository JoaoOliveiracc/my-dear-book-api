import express from "express";
import books from "./booksRoute.js";

const routes = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send("My dear api");
    });

    app.use(express.json(), books);
};

export default routes;