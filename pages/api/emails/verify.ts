// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
var postmark = require("postmark");

var serverToken = "xxxx-xxxxx-xxxx-xxxxx-xxxxxx";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   // Example request
var client = new postmark.ServerClient("server token");




    try {
        client.sendEmail({
            "From": "sender@example.com",
            "To": "receiver@example.com",
            "Subject": "Test", 
            "TextBody": "Hello from Postmark!"
        });

        res.status(200).end();

    } catch (error) {
        res.status(500).json(error)
    
    }
    
            
    
}
