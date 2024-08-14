// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Res = {
  text: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Res>
) {
  console.log("called")
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  await sleep(5000);

  if(req.method === 'GET') {
    res.status(200).json({ text: 'GET' });
  }
  if(req.method === 'POST') {
    const { input } = req.body
    const now = new Date();
    res.status(200).json({ text: `responsed: '${input}' //${now.toISOString()}` });
  }
 
}
