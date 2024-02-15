// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { DocumentData, QuerySnapshot, collection, doc, getDoc } from "firebase/firestore";
import { MembersType } from '@/types';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const mdData = req.body

    const {mdID} = mdData

    const markdownRef = doc(db, "markdowns", mdID)

    await getDoc(markdownRef).then( (docSnap) => {
        const members: MembersType[] = [];

        if (docSnap.exists()) {
            const membersData = docSnap.data().members

            membersData.forEach((m: MembersType) => {
                members.push(m)
            })
        } else {
            res.status(404).json({ message: "No such member!" });
        }

        res.status(200).json(members)

    }).catch((err) => {
        res.status(500).json(err)
    });
   
   
}
