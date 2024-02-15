
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { collection, doc, serverTimestamp, updateDoc, deleteDoc, arrayRemove, } from "firebase/firestore";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body

    // console.log({data})

    const {memberID, memberAccess, mdID } = data

    let inputsAreValid = true
    

    if (!inputsAreValid) {
        res.status(500)
        return
    }

    const membersRef = doc(db, "markdowns", mdID, "members", memberID);

    // console.log({memberID, memberEmail, memberAccess, mdID})


    if (memberAccess === 'remove') { // Remove member
        console.log({memberID, memberAccess})
        const mdRef = doc(db, "markdowns", mdID);
    
        await updateDoc(mdRef, {
            memberIDs: arrayRemove(memberID),
        }).then( async () => {
            await deleteDoc(membersRef).then( () => {
                res.status(200).end()
            })
        }).catch((err) => {
            console.error('Error updating markdown:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        })
    } else { // Grant member access
        await updateDoc(membersRef, {
            access: memberAccess,
        }).then( () => {
            res.status(200).end()
        }).catch((err) => {
            console.error('Error updating markdown:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }

   
    
        
    
}

