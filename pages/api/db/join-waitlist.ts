// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { collection, doc, serverTimestamp, addDoc } from "firebase/firestore";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body

    const {email, name } = data

    let inputsAreValid = true
    

    if (!inputsAreValid) {
        res.status(500)
        return
    }

    const docRef = collection(db, "waitlist");

        const dataToSend = {
            name,
            email,
        }

        await addDoc(docRef, dataToSend)
            .then( (docRef) => {
                console.log("Successful")
                res.status(200).json({id: docRef.id})
            })
            .catch((err) => {
                console.error('Error creating document:', err);
                res.status(500).json({ error: 'Failed to create document' });
            });
    
}