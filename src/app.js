import express from "express";

const app = express();
app.use(express.json());

const books = [
    {
        id: 1,
        title: "O Senhor dos Anéis" 
    },
    {
        id: 2,
        title: "O Corvo" 
    }
];

function searchBook(id) {
    return books.findIndex(book => {
        return book.id === Number(id)
    });
}

app.get("/", (req, res) => {
    res.status(200).send("My dear book");
});

app.get("/books", (req, res) => {
    res.status(200).json(books);
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

export default app;