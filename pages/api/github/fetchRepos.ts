import { NextApiRequest, NextApiResponse } from "next";
import { getUserRepos } from "@/lib/github/imports";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = await req.body;
  const repos = await getUserRepos(username);

  try {
    res.status(200).send(repos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
