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

type Sex = "male" | "female";

type UserInfo = {
  numberOfPeople: number;
  sex: "male" | "female";
  age: number;
};

type CheapestDayAndPrice = {
  day: string;
  price: number;
};

function getCheapestDayAndPrice(
  params: UserInfo[]
): CheapestDayAndPrice | Error {}

const SCHEDULE = [
  {
    date: new Date("2023/10/30 15:00"),
    availableSeats: 4,
  },
  {
    date: new Date("2023/10/30 20:00"),
    availableSeats: 6,
  },
  {
    date: new Date("2023/11/01 15:00"),
    availableSeats: 1,
  },
  {
    date: new Date("2023/11/01 20:00"),
    availableSeats: 2,
  },
  {
    date: new Date("2023/11/02 15:00"),
    availableSeats: 4,
  },
  {
    date: new Date("2023/05/02 20:00"),
    availableSeats: 5,
  },
];

type PRICE_KEYS = "adult" | "child";

const PRICES: Record<PRICE_KEYS, number> = {
  adult: 1600,
  child: 1000,
};
