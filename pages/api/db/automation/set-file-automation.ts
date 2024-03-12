// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/firebase";
import {
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;

  // console.log({data})

  const { mdID, provider, repo, type, updateEvery } = data;

  let inputsAreValid = true;

  if (!inputsAreValid) {
    res.status(500);
    return;
  }

  const mdRef = doc(db, "markdowns", mdID);

  await updateDoc(mdRef, {
    automation: {
      provider,
      repo,
      type,
      updateEvery,
    },
  })
    .then(async (data) => {
      res.status(200).end();
    })
    .catch((err) => {
      console.error("Error updating markdown:", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
}
