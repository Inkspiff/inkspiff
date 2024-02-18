// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body
    const {userId, mdId, content, currentHead, currentLine} = data

    let inputsAreValid = true
    

    if (!inputsAreValid) {
        res.status(500)
        return
    }

    

    const mdRef = doc(db, "markdowns", mdId);

    
        await updateDoc(mdRef, {
            content: content,
            currentLine: currentLine,
            currentHead: currentHead,
            lastEdited: serverTimestamp(),
            lastEditedBy: userId,
        }).then( async (data) => {
            res.status(200).end(); // Send a response indicating success
        }).catch((err) => {
            res.status(500).json(err)
        });
    
}
