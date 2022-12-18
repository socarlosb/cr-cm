import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tag } = req.query;

  const url = `${process.env.PROXY_ENDPOINT}/clans/%23${tag
    .toString()
    .toUpperCase()}/currentriverrace`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.PROXY_TOKEN}`,
      },
    });
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error({ error });
    res.status(300).json({ error });
  }
}
