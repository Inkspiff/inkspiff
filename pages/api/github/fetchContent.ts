import { NextApiRequest, NextApiResponse } from "next";
import { getContent } from "@/lib/github/imports";
import { GithubData } from "@/lib/github/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const githubData: GithubData = req.body;
  const content = await getContent(githubData);

  try {
    res.status(200).send(content);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
