import React, {useEffect} from "react"
import Head from "next/head";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import View from "@/components/editor/layout/View";
import Templates from "@/components/templates/Templates";
import CreateNew from "@/components/create/CreateNew";
import Navbar from "@/components/editor/layout/Navbar";

import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession } from "next-auth/next"
import { getProviders } from "next-auth/react"
import {authOptions} from "@/lib/auth"
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router"
import LeftSidePanel from "@/components/editor/layout/RightSidePanel"
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";


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
    props: { providers: providers ?? [] },
  }
}

export default function App() {
  const { data: session } = useSession();
  const router = useRouter()
  const app = useSelector((state: RootState) => state.app)
  const {viewSettings} = app




  useEffect(() => {
    if (!session) {
      router.push("/login")
    }
  }, [])


  return (
    <div>
      <Head>
        <title>Create README | Inkspill</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <Box sx={{display: "flex"}}>

      </Box>
      <Navbar />
      <Box
        component="main"
        sx={{
          mt: {sm: "45px", xs: "45px"},
          height: {
            xs: "auto",
            sm: "calc(100vh - 45px)"
          },
          
          overflow: { xs: "auto", md: "hidden" },
          // outline: "4px solid black",
        }}
      >
       
        <Grid container >
            <Grid item >
                
            </Grid>
        </Grid>
      </Box>
    </div>
  );
}
