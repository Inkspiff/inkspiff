// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/firebase";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { FileUpdateType } from "@/types/editor";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;

const updateIds: string[] = data.updateIds;

try {
    const updatesRef = collection(db, "updates");
    const updatesQuery = query(
        updatesRef,
        where("id", "in", updateIds),
        orderBy("timestamp", "desc"),
    );

    console.log({updateIds})

    const batch = writeBatch(db);

    updateIds.forEach((id) => {
        const updateRef = doc(db, "updates", id);
        batch.update(updateRef, { seen: true });
      });
      
    await batch.commit();

    console.log("updates seen");

    

    res.status(200).end();
} catch (error) {
    console.log({error})
    res.status(500).json(error);
}

}
