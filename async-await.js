import five from "johnny-five";
import express from "express";
import { createBoard } from "./createBoard.js";

const app = express();
const { PORT = 3000 } = process.env;

await createBoard({ repl: false });

const button = new five.Button({
  pin: 2,
});

let isPressed = false;

button.on("down", () => (isPressed = true));
button.on("up", () => (isPressed = false));

app.get("/", (req, res) => {
  res.status(200).send(getMessage());
});

app.listen(PORT, () => {
  console.log("Server is running on Port " + PORT);
});
