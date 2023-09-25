// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { DocumentData, QuerySnapshot, collection, doc, getDocs } from "firebase/firestore";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const userData = JSON.parse(req.body)

    const {id} = userData

    const userMdsRef = collection(db, "accounts", id, "mds")

    
    interface mdType  extends DocumentData {
        id: string;
    }

    await getDocs(userMdsRef).then( (querySnapshot) => {
        

        const mds: mdType[] = [];
        
        querySnapshot.forEach((mdDoc) => {
            mds.push({
                id: mdDoc.id,
                ...mdDoc.data()
            })
        }) 

        res.status(200).json(mds)
        

    }).catch((err) => {
        res.status(500)
    });

   
   
}
