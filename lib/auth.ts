import {NextAuthOptions} from "next-auth"
import GithubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter, FirebaseAdapterConfig, } from "@next-auth/firebase-adapter";
// import * as firestoreFunctions from "firebase/firestore"
import { db } from "@/firebase"
import { collection, doc, updateDoc, serverTimestamp, addDoc, getDoc,  } from "firebase/firestore";
import { cert } from "firebase-admin/app";

const { privateKey } = JSON.parse(process.env.FIREBASE_PRIVATE_KEY!);



export const authOptions: NextAuthOptions = {
  // session: {
  //   strategy: "jwt",
  // },
  pages: {
    signIn: "/login"
  },
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST as string,
        port: parseInt(process.env.EMAIL_SERVER_PORT as string),
        auth: {
          user: process.env.EMAIL_SERVER_USER as string,
          pass: process.env.EMAIL_SERVER_PASSWORD as string
        }
      },
      from: process.env.EMAIL_FROM
    })
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials, }) {
      // Check if the email is already associated with another account
      // const existingUser = await findUserByEmail(email);
      console.log("redirecting to /editor")
      
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        if (account?.provider === 'google') {
          // console.log({user, account, profile, email, credentials})
        }
        if (account?.provider === 'github') {
          // console.log({user, account, profile, email, credentials})
        }
        if (account?.provider === 'email') {
          console.log({user, account, profile, email, credentials})
        }
        return true

      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token, account, profile }) {
      // console.log({token, account, profile})
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {

      
      if (user) {

        const emailVerifiedString = user?.emailVerified?.toISOString(); // Adjust this based on your preference


        session.user = {
          ...user,
          emailVerified: emailVerifiedString,
        }
      }
      
      return session
    }
  },
  secret: process.env.JWT_SECRET as string
}
