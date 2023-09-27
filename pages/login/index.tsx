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
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
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



const Login = ({ session, providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const { data: session } = useSession();
  const router = useRouter()

  console.log({session})

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
            <Box sx={{
              textAlign: "center"
            }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  lineHeight: { xs: "1.25rem", sm: "1.5rem" },
                  mb: 1,
                }}
              >
                Hey, {session.user.name!.split(" ")[0]}{" "}
              </Typography>

              <Box
              sx={{
                width: "80px",
                height: "80px",
                position: "relative",
                mb: 1,
                borderRadius: "50%",
                display: "inline-block",
                overflow: "hidden",

                "& img": {
                  objectFit: "contain",
                }
              }}
              >
                <Image alt={`${session.user.name!} github`} src={session.user.image!} fill />
              </Box>

              <Typography
                variant="body1"
                sx={{
                  mb: 1,
                }}
              >
                You&apos;re already logged in to your account
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  "& a": {
                    color: "#121212",
                  },
                }}
              >
                <Link href="/editor">
                  Go to Editor
                </Link>
              </Typography>
            </Box>
          ) : (
            <>
              <Box>
                
              <Typography variant="h1" sx={{
                mb: 2
              }}>Login to your account </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 1,
                  }}
                >
                  Use Github to sign in to your account
                </Typography>
              </Box>

              <UserAuthForm />

              <Typography
                variant="body1"
                sx={{
                  "& a": {
                    color: "#121212",
                  },
                }}
              >
                <Link href="/register">
                  Don&apos;t have an account? Sign Up
                </Link>
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Login;
