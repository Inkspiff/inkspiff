import React, { useEffect } from "react";
import Head from "next/head";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import Link from "next/link";
import View from "@/components/editor/layout/View";
import Templates from "@/components/templates-page/Templates";
import CreateNew from "@/components/create/CreateNew";
import Navbar from "@/components/editor/layout/Navbar";
import Box from "@mui/material/Box";
import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import { getServerSession } from "next-auth/next";
import { getProviders } from "next-auth/react";
import { authOptions } from "@/lib/auth";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
// import { useRouter } from "next/navigation"
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import LeftSidePanel from "@/components/editor/layout/LeftSidePanel";
import Feedback from "@/components/help/Feedback";
import LoginModal from "@/components/auth/login-modal";

import { db } from "@/firebase";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  doc,
  getDoc,
} from "firebase/firestore";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    console.log({ session });
    const mdCollection = collection(db, "markdowns");

    

    const q = query(mdCollection, where("memberIDs", "array-contains", session.user.id), orderBy("lastEdited", "desc"), limit(1))

    try {
      const querySnapshot = await getDocs(q);
      

      if (!querySnapshot.empty) {
        const mdDoc = querySnapshot.docs[0];
        const mdData = mdDoc.data();

        const markdownSlug = `${mdData.title.trim().split(" ").join("-")}-${mdDoc.id}`
        return { redirect: { destination: `/editor/${markdownSlug}` } };

      } else {
        // No markdown found
        console.log("No markdown found");
        return { redirect: { destination: `/create-new` } };
      }
    } catch (err) {
      // Internal Server Error - No markdowns found
      console.log("Internal Server Error", err)
    }
  }

  const providers = await getProviders();

  return {
    props: {
      session: session,

      providers: providers ?? [],
    },
  };
}

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: 0,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
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
    if (!session) {
      dispatch(appActions.toggleOpenLoginModal());
    }
  }, [])


  return (
    <div>
      <Head>
        <title>Create & Edit markdown easily | Inkspiff</title>
      </Head>

      <Box
        sx={{
          display: "flex",
          // border: "2px solid yellow",
          height: { xs: "calc(100vh - 45px)", sm: "calc(100vh - 60px)" },
          position: "relative",
          width: "100%",
          marginTop: "45px",
          overflowY: { xs: "auto", sm: "hidden" },
        }}
      >
        <Navbar />
        <LeftSidePanel />

        <Main
          open={open}
          sx={{
            height: "100%",
            // border: "3px solid green",
            width: viewSettings.drawer ? "calc(100% - 240px)" : "100%",
            display: { xs: "none", sm: "block" },
          }}
        >
          <View />
        </Main>

        <Box
          sx={{
            height: "100%",
            // border: "3px solid mediumseagreen",
            width: "100%",
            display: { sm: "none" },
          }}
        >
          <View />
        </Box>
        <Feedback />
        <LoginModal />
      </Box>
    </div>
  );
}
