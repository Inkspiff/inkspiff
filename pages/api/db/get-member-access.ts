// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { DocumentData, doc, getDoc } from "firebase/firestore";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const mdData = req.body

    const {mdID, memberId} = mdData

    const memberRef = doc(db, "members", memberId)

    await getDoc(memberRef).then( (docSnap) => {
        
        if (docSnap.exists()) {
            res.status(200).json({ access: docSnap.data().access });
        } else {
            res.status(404).json({ message: "No such member!" });
        }

    }).catch((err) => {
        res.status(500).json(err)
    });
   
   
}
