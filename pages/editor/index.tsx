import React, {useEffect} from "react"
import Head from "next/head";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import Link from "next/link"
import View from "@/components/editor/View";
import Templates from "@/components/Templates";
import CreateNew from "@/components/CreateNew";
import Navbar from "@/components/editor/Navbar";
import Box from "@mui/material/Box";
import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession } from "next-auth/next"
import { getProviders } from "next-auth/react"
import {authOptions} from "@/lib/auth"
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router"
// import { useRouter } from "next/navigation"
import LeftSidePanel from "@/components/editor/LeftSidePanel"
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import RightSidePanel from "@/components/editor/RightSidePanel";
import Feedback from "@/components/help/Feedback"


import { db } from "@/firebase"
import { DocumentData, QuerySnapshot, collection, query, where, getDocs, orderBy, limit, doc, getDoc } from "firebase/firestore";


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
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




  return (
    <div>
      <Head>
        <title>Create README | Inkspill</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      
      <Box
        sx={{
          display: 'flex',
        // border: "1px solid red",
        height: "100vh",
        position: "reative"
        }}
      >
        <Navbar />
       <RightSidePanel open={open} />

       <Main open={open} sx={{
        // m: 0,
        mt: "45px",
        height: "calc(100% - 45px)",
        // border: "4px solid green"
      }}>
        <View />
      </Main>
        
        <Feedback />
      </Box>
    </div>
  );
}


