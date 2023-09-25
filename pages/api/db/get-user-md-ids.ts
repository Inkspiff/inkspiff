// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/firebase";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log({
    body: req.body,
  })
  const userData = req.body



  const { userId } = userData;

  const mdsRef = collection(db, "markdowns");

  const q = query(mdsRef, where("allowedUsers", "array-contains", userId));

  interface fileListType {
    id: string;
    title: string;
  }

  await getDocs(q)
    .then((querySnapshot) => {
      const fileList: fileListType[] = [];

      querySnapshot.forEach((templateDoc) => {
        fileList.push({
          id: templateDoc.id,
          title: templateDoc.data().title,
        });
      });

      res.status(200).json(fileList);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}
