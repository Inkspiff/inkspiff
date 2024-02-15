import { NextApiRequest, NextApiResponse } from "next";
import { getFiles } from "@/lib/github/imports";
import { GithubData } from "@/lib/github/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const githubData: GithubData = req.body;
    const files = await getFiles(githubData);
    res.status(200).send(files);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
