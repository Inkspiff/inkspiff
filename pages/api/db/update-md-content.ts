// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body

    const {mdId, content, currentLine } = data

    let inputsAreValid = true
    

    if (!inputsAreValid) {
        res.status(500)
        return
    }

    const mdRef = doc(db, "markdowns", mdId);

    
        await updateDoc(mdRef, {
            content,
            currentLine,
        }).then( async (data) => {
            res.status(200).end(); // Send a response indicating success
        }).catch((err) => {
            res.status(500).json(err)
        });
    
}
