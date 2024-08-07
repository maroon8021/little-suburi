// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  // set cookie
  res.setHeader("Set-Cookie", "is-login=true; Path=/; HttpOnly");
  res.status(200).json({});
}
