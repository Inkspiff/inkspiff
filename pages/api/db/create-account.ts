// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
import { collection, doc, Timestamp, addDoc } from "firebase/firestore";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const userData = JSON.parse(req.body)

    const {firstname, lastname, email, profilePic, github} = userData

    let inputsAreValid = true
    

    if (!inputsAreValid) {
        res.status(500)
        return
    }


    const userRef = collection(db, "accounts");

    const userDataToSend = {
        ...userData,
        createdAt: Timestamp.now()
    }

    // Add a new document in collection "cities"
    await addDoc(userRef, userDataToSend).then( async (data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(500)
    });
   
}
