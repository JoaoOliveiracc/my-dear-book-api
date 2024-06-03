import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.status(200).send("My dear book");
});

export default app;