// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { collection, doc, deleteDoc } from "firebase/firestore";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const reqData = req.body

    const {userId, mdId} = reqData

    let inputsAreValid = true
    

    if (!inputsAreValid) {
        res.status(500)
        return
    }



    const mdRef = doc(db, "markdowns", mdId);

      try {
        await deleteDoc(mdRef)
            res.status(200).end()
      }
      catch {
        res.status(500)
      }

    
        // await deleteDoc(mdRef).then((data) => {
        //     res.status(200).end()
        // }).catch((err) => {
        //     res.status(500)
        // });;
    
}
