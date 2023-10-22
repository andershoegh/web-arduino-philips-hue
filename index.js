import five from "johnny-five";
import express from "express";
import axios from "axios";
import https from "https";
import { getIsLightOn } from "./getLightStatus.js";
import createBoard from "../utilities/create-board.js";

const app = express();
const { PORT = 3000 } = process.env;
// const board = new five.Board({
//   repl: false,
// });

const board = await createBoard();

let isPressed = false;

const button = new five.Button({
  pin: 2,
});

const led = new five.Led(11);

const lightStatus = await getIsLightOn();
if (lightStatus) led.on();

button.on("press", async () => {
  led.toggle();

  const lightIsOn = await getIsLightOn();

  axios
    .put(
      "https://192.168.86.21/clip/v2/resource/light/fddb0cfe-12fd-4c67-89f3-ee9dff38b679",
      { on: { on: !lightIsOn } },
      {
        headers: {
          "hue-application-key": "jZh-vq4k3qYfFPSJ22mrj6NfDm17UyMe7iqhsmj4",
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      }
    )
    .catch((err) => console.log(err));
});

app.post("/", (req, res) => {
  led.toggle();
  res.send("Toggled light");
});

app.listen(PORT, () => {
  console.log(
    "👻 Your server is up and running on Port " + PORT + ". Right on!"
  );
});
