// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { collection, doc, serverTimestamp, updateDoc, arrayUnion, arrayRemove, } from "firebase/firestore";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body

    // console.log({data})

    const {memberID, memberEmail, memberAccess, mdID } = data

    let inputsAreValid = true
    

    if (!inputsAreValid) {
        res.status(500)
        return
    }

    const mdRef = doc(db, "markdowns", mdID);


    if (memberAccess === 'remove') {
        const mdRef = doc(db, "markdowns", mdID);
    
        await updateDoc(mdRef, {
            membersIDs: arrayRemove(memberID),
            members: arrayRemove({
                id: memberID,
                access: memberAccess,
                email: memberEmail,
            }),
        }).then( async (data) => {
            res.status(200).end()
        }).catch((err) => {
            console.error('Error updating markdown:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        })
    } else {
        await updateDoc(mdRef, {
            members: arrayUnion({
                id: memberID,
                email: memberEmail,
                access: memberAccess
            }),
        }).then( async (data) => {

            // TODO: SEND EMAIL TO NEW MEMBER
            res.status(200).end()
        }).catch((err) => {
            console.error('Error updating markdown:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }  
    
}



