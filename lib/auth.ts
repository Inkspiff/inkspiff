import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import Providers from "next-auth/providers";
import {
  FirestoreAdapter,
  FirebaseAdapterConfig,
} from "@next-auth/firebase-adapter";
// import * as firestoreFunctions from "firebase/firestore"
import { db } from "@/firebase";
import {
  collection,
  doc,
  updateDoc,
  serverTimestamp,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { cert } from "firebase-admin/app";

const { privateKey } = JSON.parse(process.env.FIREBASE_PRIVATE_KEY!);

import * as admin from "firebase-admin";
import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequest, NextApiResponse } from "next";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
  });
}

interface GetAuthOptionsProp {
  req?: IncomingMessage | NextApiRequest;
  res?: ServerResponse | NextApiResponse;
}

export const getAuthOptions = (
  req?: GetAuthOptionsProp["req"],
  res?: GetAuthOptionsProp["res"]
): NextAuthOptions => {

  let activeUserId: string | null = null;
  let callbackUrl: string | undefined = undefined;

  if (req && (req as NextApiRequest).cookies) {
    callbackUrl =
      (req as NextApiRequest).cookies?.["next-auth.callback-url"] ||
      (req as NextApiRequest).cookies?.["__Secure-next-auth.callback-url"];

    if (callbackUrl) {
      const url = new URL(callbackUrl);
      activeUserId = url.searchParams.get("activeUserId");
    }
  }

  return {
    // session: {
    //   strategy: "jwt",
    // },
    pages: {
      signIn: "/login",
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
        allowDangerousEmailAccountLinking: true,
        // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
        // @ts-ignore
        //   scope: 'repo', // Request access to user's repositories
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        allowDangerousEmailAccountLinking: true,
        // authorization: {
        //   params: {
        //     params: {
        //       access_type: "offline",
        //       prompt: "consent",
        //       // request_type: "code",
        //       // userId: user.id,
        //     }
        //   }
        // }
      }),
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST as string,
          port: parseInt(process.env.EMAIL_SERVER_PORT as string),
          auth: {
            user: process.env.EMAIL_SERVER_USER as string,
            pass: process.env.EMAIL_SERVER_PASSWORD as string,
          },
        },
        from: process.env.EMAIL_FROM,
      }),
      // ...add more providers here
    ],
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        // Check if the email is already associated with another account
        // const existingUser = await findUserByEmail(email);
        // console.log("\n\n\n---\nsignIn callback starts");
        console.log({ user, account, profile, email, credentials });

        const isAllowedToSignIn = true;
        if (isAllowedToSignIn) {
          if (account?.provider === "google") {
            // nothing for now
          }

          if (account?.provider === "github") {
            const userDocRef = doc(
              db,
              "users",
              activeUserId ? activeUserId : user.id
            );

            const userDocSnap = await getDoc(userDocRef);

            console.log({ callbackUrl, activeUserId });
            callbackUrl = undefined;
            activeUserId = null;

            if (!userDocSnap.exists()) {
              console.log("No such user!");
            } else {
              if (userDocSnap.get("githubUsername") === null) {
                console.log("githubUsername does not exist!");
              } else {
                await updateDoc(userDocRef, {
                  githubUsername: (profile as any).login!,
                  githubId: (profile as any).id!,
                });
              }
            }
          }
          if (account?.provider === "email") {
            // nothing for now
          }

          // console.log("signIn callback ends\n---\n\n\n");
          return true;
        } else {
          // Return false to display a default error message
          return false;
          // Or you can return a URL to redirect to:
          // return '/unauthorized'
        }
      },
      // async redirect({ url, baseUrl }) {
      //   return baseUrl
      // },
      // async jwt({ token, account, profile }) {
      //   console.log('\n\n\n---\njwt callback starts')
      //   console.log({ token, account, profile });
      //   console.log('jwt callback ends\n---\n\n\n')
      //   // Persist the OAuth access_token to the token right after signin
      //   if (account) {
      //     token.accessToken = account.access_token;
      //   }
      //   return token;
      // },
      async session({ session, token, user }) {
        // console.log("\n\n\n---\nsession callback starts");
        // console.log({ session, token, user });
        // console.log("session callback ends\n---\n\n\n");
        if (user) {
          if (user.id) {
            const firebaseToken = await admin.auth().createCustomToken(user.id);
            session.firebaseToken = firebaseToken;
          }

          const emailVerifiedString = user?.emailVerified
            ? user?.emailVerified?.toISOString()
            : null;

          session.user = {
            ...user,
            emailVerified: emailVerifiedString,
          };
        }

        return session;
      },
    },
    events: {
      async signIn({ user, account, profile }) {
        // console.log("---\n\n\n signIn Action \n\n\n---");
      },
      async linkAccount({ user, account, profile }) {
        // console.log("---\n\n\n Linker Action \n\n\n---");
      },
      async session({ session, token }) {
        // console.log("---\n\n\n Session Action Start\n---");
        // console.log({ session });
        // console.log("\nSession Action Start\n\n\n---");
      },
    },
    secret: process.env.JWT_SECRET as string,
    // debug: process.env.NODE_ENV !== 'production',
  };
};
