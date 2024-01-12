// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { collection, doc, updateDoc, serverTimestamp, setDoc } from "firebase/firestore";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const mdData = JSON.parse(req.body)

    const {id, title, markdown, user, } = mdData

    let inputsAreValid = true
    

    if (!inputsAreValid) {
        res.status(500)
        return
    }


    const mdRef = collection(db, "accounts", user, "mds");

    const mdDataToSend = {
        ...mdData,
        lastUpdated: serverTimestamp,
    }

    
        await setDoc(doc(mdRef, id), mdDataToSend).then( async (data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(500)
        });
    
}
