import type { NextApiRequest, NextApiResponse } from "next";

type Response = {
  version: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const version = process.env.BUILD_ID || "no";
  res.status(200).json({ version });
}
