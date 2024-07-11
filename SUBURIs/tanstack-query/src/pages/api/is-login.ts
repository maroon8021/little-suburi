// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Response = {
  isLogin: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const isLogin = req.cookies?.["is-login"] === "true";
  res.status(200).json({ isLogin });
}
