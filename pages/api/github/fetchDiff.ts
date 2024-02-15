import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { github, pr } = await req.body;
    const response = await fetch(
      `https://patch-diff.githubusercontent.com/raw/${github}/pull/${pr}.diff`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub PR diff: ${response.statusText}`);
    }
    const diffContent = await response.text();
    res.status(200).send(diffContent);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
