import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation"
import { UserAuthForm } from "@/components/auth/user-auth-form";
import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession } from "next-auth/next"
import { getProviders } from "next-auth/react"
import {authOptions} from "@/lib/auth"
import { Session } from 'next-auth';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Define the type for the session object
type MySession = Session | null;




export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  // if (session) {
  //   return { redirect: { destination: "/" } };
  // }

  const providers = await getProviders();
  
  return {
    props: { 
      session: session,
    
      providers: providers ?? [] 
    },
  }
}


const Register = () => {
  // const { data: session } = useSession()

  // console.log({session})

  // if (session) {
  return (
    <Box>
       <Head>
        <title>Inkspill - Create README files is seconds</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      {/* <HomeHeader /> */}

      <Box
        component="main"
        sx={{
          // mt: {sm: "64px", xs: "56px"},
          outline: "1px solid black",
          position: "relative",
          // height: {xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)"}
          height: "100vh",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography variant="h1" sx={{
            mb: 2
          }}>Create an account </Typography>

          <Typography variant="body1">
            Use Github to create your account
          </Typography>
        </Box>

        <UserAuthForm />
        <Typography className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </Typography>
        <Typography variant="body1">

          <Link href="/login">Already have an account? Login</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
