import express from "express";
import { Request, Response } from "express";

const app = express();
const port = 51000;

app.get("/", (req: Request, res: Response) => {
  res.send("The sedulous hyena ate the antelope!");
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
