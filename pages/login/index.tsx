import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation"
import { UserAuthForm } from "@/components/auth/user-auth-form";
import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession } from "next-auth/next"
import { getProviders } from "next-auth/react"
import {getAuthOptions} from "@/lib/auth"
import { Session } from 'next-auth';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoggedIn from "@/components/auth/LoggedIn";

import Login from "@/components/auth/Login";
import { syncFirebaseAuth } from "@/firebase";



export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, getAuthOptions());
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!

  // syncFirebaseAuth(session)

  if (session) {

    // console.log("email checker", {session})

    const emailIsVerified = session?.user?.emailVerified;

    if (!emailIsVerified) {
      return { redirect: { destination: "/login/verify-email" } };
    }

  }

  

  const providers = await getProviders();
  
  return {
    props: { 
      session: session,
    
      providers: providers ?? [] 
    },
  }
}



const LoginPage = ({ session, providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const { data: session } = useSession();
  const router = useRouter()

  // useEffect(() => {
  //   syncFirebaseAuth(session)
  //   console.log("---\n\n\nfirebase auth wrapper")
  // }, [session])
  

  // if (session) {
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
        <Box
          sx={{
            // border: "1px solid red",
            position: "absolute",
            top: "16px",
            left: "16px",
            
          }}

          
        >
          {/* <Link href="/"> */}
            <>
            
            <Typography sx={{
              display: "inline-flex",
              alignItems: "flex-end",
              cursor: "pointer"
            }} onClick={() => {router.back()}}><ChevronLeftRoundedIcon sx={{
              m: 0,
            }}/>Back</Typography>
            </>
          {/* </Link> */}
        </Box>

        <Box
          sx={{
            // border: "1px solid red",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            textAlign: "center",
          }}
        >
          {session ? (
            <LoggedIn />
          ) : (
            <Login />
          )}
        </Box>
      </Box>
    </div>
  );
};

export default LoginPage;
