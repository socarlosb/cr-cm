import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const now = new Date();
  const url = `${process.env.PROXY_ENDPOINT}/cards`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.PROXY_TOKEN}`,
      },
    });

    res.status(200).json({
      status: response.status === 200 ? "online" : "offline",
      time: now.toUTCString(),
    });
  } catch (error) {
    console.error({ error });
    res.status(300).json({ error });
  }
}
