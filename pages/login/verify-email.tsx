import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router"
import { UserAuthForm } from "@/components/auth/user-auth-form";
import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession } from "next-auth/next"
import { getProviders } from "next-auth/react"
import {authOptions} from "@/lib/auth"
import { Session } from 'next-auth';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoggedIn from "@/components/auth/LoggedIn";
import { db } from "@/firebase"
import { collection, doc, serverTimestamp, updateDoc, arrayUnion, addDoc, setDoc, getDoc, getDocs, query, where, limit, } from "firebase/firestore";


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (!session) {
    return { redirect: { destination: "/login" } };
  }

  let emailVerified = false


  if (session) {
    
  console.log("reached here")

    const emailIsVerified = session?.user?.emailVerified;

    if (emailIsVerified) {
        return { redirect: { destination: "/" } };
    }

    // eg. http://localhost:3000/login/verify-email?token=7yw0p6idne215p07wzcxtb
    const token = context.query.token;

    console.log({emailIsVerified, query: context.query, token})

    if (token) {
        
        // verify that token matched an unexpired token in the db
        const veryRef = collection(db, 'verificationTokens')

        const currentTime = new Date();

        const q = query(
            veryRef, 
            where("identifier", "==", session.user.email), 
            where("token", "==", token),
            where("expires", ">", currentTime),
            limit(1))

        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
            // No token matches
            return { redirect: { destination: "/" } };
        }

        // const verificationTokenDoc = querySnapshot.docs[0];

        const userDoc = doc(db, 'users', session.user.id)

        await updateDoc(userDoc, {
            emailVerified: serverTimestamp()
        })
        
        emailVerified = true


    }

  }


  const providers = await getProviders();
  
  return {
    props: { 
      session: session,
      emailVerified,
      providers: providers ?? [] 
    },
  }
}



const VerifyEmail = ({ session, emailVerified, providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const { data: session } = useSession();
  const router = useRouter()
  const [sentEmail, setSentEmail] = React.useState(false)
  const [sendingEmail, setSendingEmail] = React.useState(false)

  const {token} = router.query

//   console.log({token, query: router.query})


    useEffect(() => { 

        const sendVerificationEmail = async () => {
            setSendingEmail(true)
            const res = await fetch("/api/emails/verify-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userEmail: session?.user?.email
                })
            })
            setSendingEmail(false)

            if (!res?.ok) {
                console.error("Error sending verification email")
                return
            }

            setSentEmail(true)

        }

        if (session && !emailVerified && !token) {
            sendVerificationEmail()
        }   

    }, [session])



  return (
    <div>
      <Head>
        <title>Inkspill - Create README files is seconds</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      {/* <HomeHeader /> */}

      <Box
        component="main"
        sx={{
          // mt: {sm: "64px", xs: "56px"},
          // outline: "1px solid black",
          position: "relative",
          // height: {xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)"}
          height: "100vh",
        }}
      >
        {emailVerified ? <Box>
                You are verificationTokenDoc
            
            </Box> : <Typography>
            An email has been sent to {session?.user?.email}. Please verify your email to continue.
        </Typography>}

        {/* <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2
        }}>
            <Link href="/login" passHref>
                <a>
                    <ChevronLeftRoundedIcon />
                    <Typography>
                        Go back
                    </Typography>
                </a>
            </Link>
        </Box> */}


    
      </Box>
    </div>
  );
};

export default VerifyEmail;
