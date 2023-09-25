// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { DocumentData, QuerySnapshot, collection, doc, getDocs } from "firebase/firestore";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("method", req.method)
    
    const templatesRef = collection(db, "templates")

    interface TemplateType  extends DocumentData {
        id: string;
    }

    await getDocs(templatesRef).then( (querySnapshot) => {
        const templates: TemplateType[] = [];
        
        querySnapshot.forEach((templateDoc) => {
            templates.push({
                id: templateDoc.id,
                ...templateDoc.data()
            })
        }) 

        res.status(200).json(templates)

    }).catch((err) => {
        console.log(err)
        res.status(500)
    });

    

   
   
}
