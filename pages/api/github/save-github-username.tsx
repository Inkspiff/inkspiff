// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { DocumentData, QuerySnapshot, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { UserType } from '@/types';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const userData =  req.body

    const {userId, githubUsername} = userData

    const userRef = doc(db, "users", userId)

    await updateDoc(userRef, {
        githubUsername: githubUsername,
    }).then( () => {
        res.status(200).json({message: "Github username saved"})
    }).catch((err) => {
        res.status(500).json(err)
    });
   
}
