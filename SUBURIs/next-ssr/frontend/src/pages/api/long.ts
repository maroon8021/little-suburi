// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Res = {
  text: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Res>
) {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  await sleep(5000);

  const now = new Date();
  res.status(200).json({ text: `responsed: ${now.toISOString()}` });
}
