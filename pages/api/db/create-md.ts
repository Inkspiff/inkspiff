// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { collection, doc, updateDoc, serverTimestamp, addDoc,  } from "firebase/firestore";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const newMdData = req.body

    const {title, content, admin,  } = newMdData

    let inputsAreValid = true
    

    if (!inputsAreValid) {
        res.status(500)
        return
    }


    const mdRef = collection(db, "markdowns");

    const mdDataToSend = {
        title,
        content,
        admin,
        currentLine: 1,
        allowedUsers: [admin],
        visibility: "public",
        lastEdited: serverTimestamp(),

    }

    // const createDocument = async (data) => {
    //     const docRef = await addDoc(collection(db, 'markdowns'), data);
    //     return docRef.id;
    //   };
    
        await addDoc(mdRef, mdDataToSend).then( (data) => {
            console.log({data})
            res.status(200).json({
                id: data.id
            })
        }).catch((err) => {
            console.error('Error creating document:', err);
            res.status(500).json({ error: 'Failed to create document' });
        });
    
}
