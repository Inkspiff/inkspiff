// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { DocumentData, QuerySnapshot, collection, doc, getDocs, query, where } from "firebase/firestore";
import { UserType } from '@/types';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body

    const {email} = data

    const usersRef = collection(db, "users" )

    const q = query(usersRef, where("email", "==", email))

    await getDocs(q).then( (querySnapshot) => {
        const userDoc = querySnapshot.docs[0]
        console.log({userDoc})
    
        const userData = userDoc.data()
    
        const user = {
            id: userDoc.id,
            email: userData.email,
            name: userData.name,
        }   
    
        res.status(200).json(user)
    
    }).catch((err) => {

        res.status(500).json(null)
    });
   
   
}
