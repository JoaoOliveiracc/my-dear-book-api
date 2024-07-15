import express from "express";
import connectDB from "./config/dbconnect.js";
import routes from "./routes/index.js";
import mongoose from "mongoose";

const connection = await connectDB();

connection.on("error", (err) => {
  console.error(err);
});

connection.once("open", () => {
  console.log("Connection successful");
})

const app = express();
routes(app);

// eslint-disable-next-line no-unused-vars
app.use((erro, req, res, next) => {
  if (erro instanceof mongoose.Error.CastError) {
    res.status(400).send({message: "Erro no parâmetro enviado."})
  }
  res.status(500).send({message: 'Erro interno no servidor.'})
});

export default app;