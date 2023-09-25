// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { DocumentData, QuerySnapshot, collection, doc, getDoc } from "firebase/firestore";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const blogId = JSON.parse(req.body)

    const blogRef = doc(db, "blogs", blogId)

    interface TemplateType  extends DocumentData {
        id: string;
    }

    await getDoc(blogRef).then( (blogDocSnap) => {
        

        if(blogDocSnap.exists()) {
            const blog = {
                id: blogDocSnap.id,
                ...blogDocSnap.data()
            }
            res.status(200).json(blog)
        }
        

    }).catch((err) => {
        res.status(500)
    });

   
   
}
