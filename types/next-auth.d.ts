import { User } from "next-auth"
import { JWT } from "next-auth/jwt"
import { AdapterUser } from "next-auth/adapters";

type UserId = string

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId
    sub: UserId
  }
}

declare module "next-auth" {
  interface Session {
    firebaseToken: string
    user: User & any
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    id: UserId
  }
}


// declare module "next-auth" {
//   interface Session {
//     user: User & {
//       id: UserId,
//       lastEdited: string,
//       emailVerified: any // null | boolean
//     }
//   }
// }
