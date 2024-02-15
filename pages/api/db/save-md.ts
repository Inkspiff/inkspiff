// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body

    // console.log({data})

    const {mdData } = data

    let inputsAreValid = true
    

    if (!inputsAreValid) {
        res.status(500)
        return
    }

    console.log("mdId", mdData.id)
    const mdRef = doc(db, "markdowns", mdData.id);

    const mdDataToSend = {
        title: mdData.title,
        content: mdData.content,
        currentLine: mdData.currentLine,
        lastEdited: serverTimestamp(),
    }

    
        await updateDoc(mdRef, mdDataToSend).then( async (data) => {
            res.status(200).end()
        }).catch((err) => {
            console.error('Error updating markdown:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
    
}
