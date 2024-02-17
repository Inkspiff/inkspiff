// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { collection, doc, serverTimestamp, updateDoc, arrayUnion, addDoc, } from "firebase/firestore";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body

    const {memberID, memberEmail, memberAccess, mdID, userId } = data

    let inputsAreValid = true
    

    if (!inputsAreValid) {
        res.status(500)
        return
    }

    const mdRef = doc(db, "markdowns", mdID);

    await updateDoc(mdRef, {
        memberIDs: arrayUnion(memberID),
        members: arrayUnion({
            email: memberEmail,
            access: memberAccess,
            id: memberID,
        })
    }).then( async() => {
        await addDoc(collection(db, "updates"), {
            type: 'invite',
            sentAt: serverTimestamp(),
            seen: false,
            from: userId,
            to: [memberID],
            markdownID: mdID,
            image: "",
            message: `You have been invited to collaborate on a markdown file.`,
        });
        res.status(200).end()
    }).catch((err) => {
        console.error('Error updating markdown:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    });
}
