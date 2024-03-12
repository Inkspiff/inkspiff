// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { DocumentData, QuerySnapshot, collection, doc, getDoc } from "firebase/firestore";
import { MembersType } from '@/types';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const mdData = req.body

    const {mdID} = mdData

    const mdRef = doc(db, "markdowns", mdID.trim())

    await getDoc(mdRef).then( (mdDocSnap) => {
        if(mdDocSnap.exists()) {
            const automation = mdDocSnap.data().automation
            res.status(200).json({automation})
        } else {
            res.status(404).json({message: "Markdown not found"})
        }
      
    }).catch((err) => {
        res.status(500).json(err)
    });
   
   
}
