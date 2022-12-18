export default async function handler(req, res) {
  const { tag }: { tag: string } = req.query;

  const url = `${
    process.env.PROXY_ENDPOINT
  }/clans/%23${tag.toUpperCase()}/members`;

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
    res.status(300).json({ message: error?.message || "some error" });
  }
}
