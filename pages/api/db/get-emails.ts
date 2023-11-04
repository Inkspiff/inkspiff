// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { collection, doc, serverTimestamp, getDocs } from "firebase/firestore";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   


    const docRef = collection(db, "waitlist");

     

        await getDocs(docRef)
            .then( (querySnapshot) => {
                console.log("Successful")
                const emails: string[] = []
                const data = querySnapshot.forEach(doc => emails.push(doc.data().email))
                res.status(200).json(emails)
            })
            .catch((err) => {
                console.error('Error creating document:', err);
                res.status(500).json({ error: 'Failed to create document' });
            });
    
}