// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { DocumentData, QuerySnapshot, collection, doc, query, where, getDocs } from "firebase/firestore";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = JSON.parse(req.body)

    const {id} = data

    const mdsRef = collection(db, "markdowns");

    const q = query(mdsRef, where("memberIDs", "array-contains", id));

    
    interface mdType  extends DocumentData {
        id: string;
    }

    await getDocs(q).then( (querySnapshot) => {

        const mds: mdType[] = [];

        if (querySnapshot.empty) {
            res.status(200).json(mds);
        }
        
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
