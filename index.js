import express from "express";
import mongoose from "mongoose";
import Cors from "cors";

import Cards from "./dbCards.js";

// App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
  "mongodb+srv://admin:gpa3hiFpbZg3u07c@cluster0.puhfvru.mongodb.net/tinderdb?retryWrites=true&w=majority";

// Middlewares
app.use(express.json());
app.use(Cors());

// DB Config
mongoose.connect(connection_url);

// API Endpoints
app.get("/", (req, res) => res.status(200).send("hello world"));

app.post("/tinder/cards", async (req, res) => {
  const dbCard = req.body;

  try {
    const data = await Cards.create(dbCard);
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/tinder/cards", async (req, res) => {
  try {
    const data = await Cards.find({});
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Listener
app.listen(port, console.log(`Listening on localhost: ${port}`));

// Export the API
export default app;

// gpa3hiFpbZg3u07c
