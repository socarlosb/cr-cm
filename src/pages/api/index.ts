import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const now = new Date();
  res.status(200).json({
    api: "online",
    now,
  });
}
