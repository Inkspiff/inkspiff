import {NextAuthOptions} from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { FirestoreAdapter, FirebaseAdapterConfig, } from "@next-auth/firebase-adapter";
// import * as firestoreFunctions from "firebase/firestore"
// import {firestore} from "@/lib/db"
import { cert } from "firebase-admin/app";


export const authOptions: NextAuthOptions = {
  // pages: {
  //   signIn: "/login"
  // },
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
  }),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
      // @ts-ignore
    //   scope: 'repo', // Request access to user's repositories
    }),
    // ...add more providers here
  ],
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   const isAllowedToSignIn = true
    // if (isAllowedToSignIn) {
    //   return '/editor'
    // } else {
    //   // Return false to display a default error message
    //   return false
    //   // Or you can return a URL to redirect to:
    //   // return '/unauthorized'
    // }
    // },
    async jwt({ token, account, profile }) {
      // console.log({token, account, profile})
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // console.log({session, token, user})
      if (user) {
        session.user = {...user}
      }
      
      return session
    }
  },
  secret: process.env.JWT_SECRET as string
}
