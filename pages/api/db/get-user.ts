// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { DocumentData, QuerySnapshot, collection, doc, getDoc } from "firebase/firestore";
import { UserType } from '@/types';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const userData = JSON.parse(req.body)

    const {userId} = userData

    const userRef = doc(db, "users", userId)

    await getDoc(userRef).then( (userDocSnap) => {


        if(userDocSnap.exists()) {
            const user: UserType = {
                id: userDocSnap.id,
                email: userDocSnap.data().email,
                emailVerified: userDocSnap.data().emailVerified,
                name: userDocSnap.data().name,
                image: userDocSnap.data().image
            }
            res.status(200).json(user)
        }
    
    }).catch((err) => {
        res.status(500).json(err)
    });
   
   
}
