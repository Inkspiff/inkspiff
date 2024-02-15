import React, { useEffect } from "react";
import Head from "next/head";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import LeftSidePanel from "@/components/editor/layout/LeftSidePanel";
// import { query } from "firebase/firestore";
import LoginModal from "@/components/auth/login-modal";
import ImportPopup from "@/components/editor/popups/ImportPopup";
import ExportPopup from "@/components/editor/popups/ExportPopup";
import TemplatesPopup from "@/components/editor/templates/TemplatesPopup";
import FeedbackPopup from "@/components/editor/popups/FeedbackPopup";
import { db } from "@/firebase"
import { DocumentData, QuerySnapshot, collection, query, where, getDocs, orderBy, limit, doc, getDoc } from "firebase/firestore";



export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const slug = context.params!['markdown-slug'] as string

  const arr = slug.split("-")
  const mdId = arr[arr.length - 1]
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (!session) {
    return { redirect: { destination: "/login" } };
  } 

  try {
    // check if slug is valid markdown id
    

    const mdRef = doc(db, "markdowns", mdId)

    const mdDoc = await getDoc(mdRef)

    if (mdDoc.exists()) {
      // valid markdown id
    } else {
      // invalid markdown id
      return { redirect: { destination: "/create-new" } };
    }


  } catch (err) {
    // if slug id not a valid markdown id
    console.log("Internal Server Error", err)
    return { redirect: { destination: "/create-new" } };
  }

  const providers = await getProviders();

  return {
    props: {
      session: session,
      slug: slug,
      markdownId: mdId,
      providers: providers ?? [] 
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


export default function App({ session, slug, markdownId, providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)
  const {viewSettings, markdown, markdownSelected, saveStates,} = app
  const {drawer: open} = viewSettings

  const {github} = markdown


  useEffect(() => {
      if (markdownSelected !== markdownId) {
        dispatch(appActions.updateMarkdownSelected(markdownId))
      }
  }, [])



  return (
    <div>
      <Head>
        <title>Create README | Inkspill</title>
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

        <Main open={open} sx={{
        height: {xs: "auto", sm: "100%"},
        // border: "3px solid green",
        width:  {xs: "100%", sm: viewSettings.drawer ? "calc(100% - 240px)" : "100%"},
        display: {xs: "auto", sm: "block"}
      }}>
        {!session && <Link href="/login">Login</Link>}
        {session && <View />}
        </Main>
        
        <TemplatesPopup />
        <ImportPopup />
        <ExportPopup />
        <FeedbackPopup />

        <LoginModal />
      </Box>
    </div>
  );
}
