import { start, dispatch, stop, spawnStateless } from "nact";
import * as express from "express";

const app = express();

const system = start();

const greeter = spawnStateless(
  system, // parent
  (msg, ctx) => console.log(`Hello ${msg.name}`), // function
  "greeter" // name
);

app.listen(3001, () => {
  console.log("start: http://localhost:3001");
});
