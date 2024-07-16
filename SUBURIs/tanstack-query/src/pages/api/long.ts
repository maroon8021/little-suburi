// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Res = {
  text: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Res>
) {
  console.log("long.ts: start");
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  console.log("long.ts: start sleep 3000ms");
  await sleep(3000);
  console.log("long.ts: end sleep 3000ms");

  const now = new Date();
  res.status(200).json({ text: `responsed: ${now.toISOString()}` });
  console.log("long.ts: end");
}
