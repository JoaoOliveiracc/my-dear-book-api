import express from "express";
import connectDB from "./config/dbconnect.js";
import book from "./models/Book.js";

const connection = await connectDB();

connection.on("error", (err) => {
    console.error(err);
});

connection.once("open", () => {
    console.log("Connection successful");
})

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("My dear book");
});

app.post("/books",  (req, res) => {
    books.push(req.body);
        res.status(201).send("Registered book");
});

app.get("/books/:id", (req, res) => {
    const index = searchBook(req.params.id);
    res.status(200).json(books[index]);
});

app.put("/books/:id", (req, res) => {
    const index = searchBook(req.params.id);
    books[index].title = req.body.title;
    res.status(200).json(books);
});

app.delete("/books/:id", (req, res) => {
    const index = searchBook(req.params.id);
    books.splice(index, 1);
    res.status(200).send("Deleted Book")
});

export default app;