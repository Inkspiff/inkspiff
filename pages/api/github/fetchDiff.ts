import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { github, pr } = req.query;
  const ghContentEndpoint = "https://patch-diff.githubusercontent.com/raw";
  const prDiffUrl = `${ghContentEndpoint}/${github}/pull/${pr}.diff`;

  try {
    const response = await fetch(prDiffUrl);

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
