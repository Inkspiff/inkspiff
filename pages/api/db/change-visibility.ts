// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body

    const {mdId, visibility } = data

    let inputsAreValid = true

    console.log({mdId, visibility})
    

    if (!inputsAreValid) {
        res.status(500)
        return
    }

    const mdRef = doc(db, "markdowns", mdId);
        await updateDoc(mdRef, {
            visibility: visibility,
        }).then( async (data) => {
            res.status(200).end(); // Send a response indicating success
        }).catch((err) => {
            res.status(500).json(err)
        });
    
}
