// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { DocumentData, QuerySnapshot, collection, query, where, getDocs, orderBy, limit, } from "firebase/firestore";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const userData = req.body

    console.log({userData})

    const {userId} = userData



    const markdownsCollection = collection(db, 'markdowns');
    const q = query(markdownsCollection, where("allowedUsers", "array-contains", userId), orderBy('lastEdited', 'desc'), limit(1));

    try {
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
            // There is at least one document matching the user ID
            const markdownDoc = querySnapshot.docs[0];

            const markdownData = {
                id: markdownDoc.id,
                ...markdownDoc.data()
            };
            
            // Process the account data as needed
            res.status(200).json(markdownData)
            
        } else {
            // No account found for the user ID
            res.status(404).json({ message: 'Markdown not found' });
        }
    } catch (error) {
        console.error('Error retrieving markdown:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
        
   
}
