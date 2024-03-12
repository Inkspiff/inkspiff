import NextAuth from "next-auth"

import { 
    // authOptions,
    getAuthOptions
} from "@/lib/auth"
import { NextApiRequest, NextApiResponse } from "next"



export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    
    return await NextAuth(req, res, getAuthOptions(req, res))
}


// const handler = NextAuth(authOptions)        
// export default handler
// export { handler as GET, handler as POST }