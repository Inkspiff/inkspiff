// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { collection, doc, serverTimestamp, addDoc, getCountFromServer } from "firebase/firestore";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body

    const {email, name } = data

    let inputsAreValid = true
    

    if (!inputsAreValid) {
        res.status(500)
        return
    }

    const colRef = collection(db, "waitlist");
            
    const snapshot = await getCountFromServer(colRef)

        const count = snapshot.data().count + 1


        const dataToSend = {
            name,
            email,
            number: count
        }

        
        await addDoc(colRef, dataToSend)
            .then( (colRef) => {
                console.log("Successful")
                res.status(200).json({id: colRef.id, count: count, })
            })
            .catch((err) => {
                console.error('Error creating document:', err);
                res.status(500).json({ error: 'Failed to create document' });
            });
    
}