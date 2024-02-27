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
  orderBy
} from "firebase/firestore";
import { FileUpdateType } from "@/types/editor";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log({
    body: req.body,
  });
  const data = req.body;

  const { userId } = data;

  const updatesRef = collection(db, "updates");

  const q = query(updatesRef, orderBy('sentAt', 'desc'));

  await getDocs(q)
    .then((querySnapshot) => {
      const updates: FileUpdateType[] = [];
      console.log(querySnapshot)
      if (querySnapshot.empty) {
        res.status(200).json(updates);
      }

      querySnapshot.forEach((updateDoc) => {
        if (updateDoc.data().to.includes(userId)) {
          updates.push({
            id: updateDoc.id,
            type: updateDoc.data().type,
            from: updateDoc.data().from,
            to: updateDoc.data().to,
            message: updateDoc.data().message,
            sentAt: updateDoc.data().sentAt,
            image: updateDoc.data().image,
            seen: updateDoc.data().seen,
            markdownID: updateDoc.data().markdownID,
          });
        }
        
      });

      res.status(200).json(updates);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}
