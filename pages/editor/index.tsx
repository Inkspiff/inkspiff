import React, {useEffect} from "react"
import Head from "next/head";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
// import { useRouter } from "next/navigation"
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import LeftSidePanel from "@/components/editor/layout/LeftSidePanel";
import Feedback from "@/components/help/Feedback"
import LoginModal from "@/components/auth/login-modal"

import { db } from "@/firebase"
import { DocumentData, QuerySnapshot, collection, query, where, getDocs, orderBy, limit, doc, getDoc } from "firebase/firestore";
import BottomPanel from "@/components/editor/layout/BottomPanel";


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    console.log({session})
    const mdCollection = collection(db, 'markdowns')

    const q = query(mdCollection, where("userId", "==", session.user.id), orderBy("lastEdited", "desc"), limit(1))

    try {
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const mdDoc = querySnapshot.docs[0]
        const mdData = mdDoc.data()

        return { redirect: { destination: `/editor/${mdData.title.trim().split(" ").join("-")}-${mdDoc.id}` } };

      } else {
        // No markdown found
        console.log("No markdown found")
        return { redirect: { destination: `/create-new` } };
      }

    } catch (err) {
      // Internal Server Error
      console.log("Internal Server Error", err)
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


  // useEffect(() => {
  //   if (session) {
  //     console.log("query useEffect in [md-id]")
  //     const arr = query['markdown-id']!.toString().split("-")
  //     const mdId = arr[arr.length - 1]

  //     if (markdownSelected !== mdId) {
  //       dispatch(appActions.updateMarkdownSelected(mdId))
  //     }
  //   }
  // }, [])


  useEffect(() => {
    if (!session) {
      dispatch(appActions.toggleOpenLoginModal())
    }
  }, [])



  return (
    <div>
      <Head>
        <title>Create & Edit markdown easily | Inkspiff</title>
      </Head>
      
      <Box
        sx={{
          display: 'flex',
        // border: "2px solid yellow",
        height: {sm: "100vh"},
        position: "relative",
        width: {xs: "100%", sm: "auto"},
        }}
      >
        <Navbar />
       <LeftSidePanel />

       <Main open={open} sx={{
        // m: 0,
        mt: "45px",
        height: {sm: "calc(100% - 45px)"},
        // border: "3px solid green",
        width:  viewSettings.drawer ? "calc(100% - 240px)" : "100%",
        display: {xs: "none", sm: "block"}
      }}>
        <View />
      </Main>
      
      <Box sx={{
        mt: "45px",
        height: {sm: "calc(100% - 45px)"},
        // border: "3px solid green",
        width: "100%",
        display: {sm: "none"}
      }}>
        <View />
      </Box>
        <BottomPanel />
        <Feedback />
        <LoginModal />
      </Box>
    </div>
  );
}


