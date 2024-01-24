// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { collection, doc, updateDoc, serverTimestamp, addDoc, setDoc,  } from "firebase/firestore";
import { generateUniqueString } from '@/lib/utils';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const newMdData = req.body

    const {title, content, creator,  } = newMdData

    console.log(newMdData)

    let inputsAreValid = true
    

    if (!inputsAreValid) {
        res.status(500)
        return
    }


    const mdRef = collection(db, "markdowns");

    const mdDataToSend = {
        title,
        content,
        admin: creator.id,
        currentLine: 1,
        github: "",
        memberIDs: [creator.id],
        members: [{
            email: creator.email,
            access: 'owner'
        }],
        visibility: "public",
        lastEdited: serverTimestamp(),
        secret: {
            hash: generateUniqueString(),
            state: 'active'
        },
        invites: []
    }

    // const createDocument = async (data) => {
    //     const docRef = await addDoc(collection(db, 'markdowns'), data);
    //     return docRef.id;
    //   };
    
        await addDoc(mdRef, mdDataToSend).then(async (data) => {
            console.log({data})
            await setDoc(doc(db, "markdowns", data.id, "members", creator.id), {
                email: creator.email,
                access: 'owner'
            })
                res.status(200).json({
                    id: data.id
                })
        }).catch((err) => {
            console.error('Error creating document:', err);
            res.status(500).json({ error: 'Failed to create document' });
        });
    
}
