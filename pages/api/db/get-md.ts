// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { DocumentData, QuerySnapshot, collection, doc, getDoc } from "firebase/firestore";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const mdData = req.body

    const {mdId} = mdData

    const mdRef = doc(db, "markdowns", mdId.trim())

    await getDoc(mdRef).then( (mdDocSnap) => {
        if(mdDocSnap.exists()) {
            const md = {
                id: mdDocSnap.id,
                ...mdDocSnap.data()
            }
            res.status(200).json(md)
        }
    
    }).catch((err) => {
        res.status(500).json(err)
    });
   
   
}
