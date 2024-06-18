import express from "express";
import connectDB from "./config/dbconnect.js";
import routes from "./routes/index.js";

const connection = await connectDB();

connection.on("error", (err) => {
  console.error(err);
});

connection.once("open", () => {
  console.log("Connection successful");
})

const app = express();
routes(app);

export default app;