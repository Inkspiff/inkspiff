// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { DocumentData, QuerySnapshot, collection, doc, getDocs } from "firebase/firestore";
import { MembersType } from '@/types';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const mdData = req.body

    const {mdID} = mdData

    const membersRef = collection(db, "markdowns", mdID.trim(), "members")

    await getDocs(membersRef).then( (querySnapshot) => {
        const members: MembersType[] = [];
        
        querySnapshot.forEach((memberDoc) => {
            members.push({
                id: memberDoc.id,
                email: memberDoc.data().email,
                access: memberDoc.data().access,
            })
        }) 

        res.status(200).json(members)

    }).catch((err) => {
        res.status(500).json(err)
    });
   
   
}
