import React, {useEffect} from "react"
import Head from "next/head";
import { useState } from "react";
import { useSelector , useDispatch} from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import Link from "next/link"
import View from "@/components/editor/layout/View";
import Templates from "@/components/templates/Templates";
import CreateNew from "@/components/create/CreateNew";
import Navbar from "@/components/editor/layout/Navbar";
import Box from "@mui/material/Box";
import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession } from "next-auth/next"
import { getProviders } from "next-auth/react"
import {authOptions} from "@/lib/auth"
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router"
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import LeftSidePanel from "@/components/editor/layout/LeftSidePanel";
// import { query } from "firebase/firestore";


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (!session) {
    return { redirect: { destination: "/login" } };
  }

  const providers = await getProviders();
  
  return {
    props: { 
      session: session,
    
      providers: providers ?? [] 
    },
  }
}



const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: 0,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));


export default function App({ session, providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const {query} = router
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)
  const {viewSettings, markdown, markdownSelected, saveStates} = app
  const {drawer: open} = viewSettings


  useEffect(() => {
    if (session) {
      console.log("query useEffect in [md-id]")
      const arr = query['markdown-id']!.toString().split("-")
      const mdId = arr[arr.length - 1]

      if (markdownSelected !== mdId) {
        dispatch(appActions.updateMarkdownSelected(mdId))
      }
    }
  }, [])




  return (
    <div>
      <Head>
        <title>Create README | Inkspill</title>
      </Head>
      
      <Box
        sx={{
          display: 'flex',
        // border: "2px solid yellow",
        height: {sm:"100vh"},
        position: "relative",
        width: "100%",
        }}
      >
        <Navbar />
       <LeftSidePanel  />

       <Main open={open} sx={{
        mt: "45px",
        height: {sm: "calc(100% - 45px)"},
        // border: "3px solid green",
        width:  viewSettings.drawer ? "calc(100% - 240px)" : "100%",
        display: {xs: "none", sm: "block"}
      }}>
        {!session && <Link href="/login">Login</Link>}
        {session && <View />}
      </Main>

      <Box sx={{
        mt: "45px",
        height: {sm: "calc(100% - 45px)"},
        // border: "3px solid green",
        width: "100%",
        display: {sm: "none"}
      }}>
        {!session && <Link href="/login">Login</Link>}
        {session && <View />}
      </Box>
        
      </Box>
    </div>
  );
}


