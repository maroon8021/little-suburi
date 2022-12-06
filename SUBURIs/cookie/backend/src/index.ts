import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();
const PORT = 50000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// app.all("/*", async (_req: Request, res: Response) => {
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   return res.status(200).send({
//     message: "Hello World!!!",
//   });
// });

app.get("/hello", async (_req: Request, res: Response) => {
  return res.status(200).send({
    message: "Hello World!!!",
  });
});

app.post("/set-only-same-origin", async (_req: Request, res: Response) => {
  res.cookie("only-same-origin", "true");
  return res.status(200).send({
    message: "Hello World!!!",
  });
});

app.post("/set-any", async (_req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.cookie("any", "true", {
    domain: "localhost",
    path: "/",
    httpOnly: true,
    sameSite: false,
    secure: false,
  });
  return res.status(200).send({
    message: "Hello World!!!",
  });
});

app.get("/check-cookie", async (req: Request, res: Response) => {
  console.log(req.cookies);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  return res.status(200).send({
    message: "hoge",
  });
});

try {
  app.listen(PORT, () => {
    console.log(`dev server running at: http://localhost:${PORT}/`);
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}
