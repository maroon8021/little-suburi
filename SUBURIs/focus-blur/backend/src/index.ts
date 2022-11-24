import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();
const PORT = 50000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.options("/*", async (_req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  return res.status(200).send({
    message: "Hello World!!!",
  });
});

app.get("/time", async (_req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  return res.status(200).send({
    message: `Hello World!!! Now: ${new Date().toLocaleTimeString()}`,
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
