// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { DocumentData, doc, getDoc } from "firebase/firestore";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const mdData = req.body

    const {mdID, memberID} = mdData

    const markdownRef = doc(db, "markdowns", mdID)

    await getDoc(markdownRef).then( (docSnap) => {
        
        if (docSnap.exists()) {

            const members = docSnap.data().members

            const member = members.find((m: { id: string; }) => m.id === memberID)

            if (member) {
                res.status(200).json({ access: member.access });
                return
            } else {
                res.status(404).json({ message: "No such member!" });
            }
        } else {
            res.status(404).json({ message: "No such member!" });
        }

    }).catch((err) => {
        res.status(500).json(err)
    }); 
}
