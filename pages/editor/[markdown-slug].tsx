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
import { getAuthOptions } from "@/lib/auth";
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

import { getUser, getUserRepos, getFiles, getContent } from "@/lib/github/imports";
import { GithubData } from "@/lib/github/types";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, getAuthOptions());
  const slug = context.params!['markdown-slug'] as string

  const arr = slug.split("-");
  const mdId = arr[arr.length - 1];

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

  try {
    // check if slug is valid markdown id

    const mdRef = doc(db, "markdowns", mdId);

    const mdDoc = await getDoc(mdRef);

    if (mdDoc.exists()) {
      // valid markdown id
    } else {
      // invalid markdown id
      return { redirect: { destination: "/create-new" } };
    }
  } catch (err) {
    // if slug id not a valid markdown id
    console.log("Internal Server Error", err);
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

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => {
  const smUp = useTheme().breakpoints.up("sm");

  return {
    flexGrow: 1,
    // width: "100%",
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,

    ...(smUp && {
      marginLeft: 0,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
    }),

    ...(open && {
      marginLeft: 0,
    }),
  };
});

export default function App({
  session,
  slug,
  markdownId,
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const dispatch = useDispatch();
  const app = useSelector((state: RootState) => state.app);
  const { viewSettings, markdown, markdownSelected, saveStates } = app;
  const { drawer: open } = viewSettings;
  const { automation } = markdown;
  const [mdFiles, setMdFiles] = useState("");
  const [mdContent, setMdContent] = useState("");
  const [diffContent, setDiffContent] = useState("");


  // const fetchFiles = async (data: GithubData) => {
  //   const response = await fetch("http://localhost:3000/api/github/fetch-files", {
  //     body: JSON.stringify(data),
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   setMdFiles(await response.json());
  //   console.log("Markdown Files", mdFiles);
  // };
  // fetchFiles({
  //   installationId: 47944306,
  //   repoFullName: "ichristwin/m3ters.js",
  //   repoOwner: "ichristwin",
  //   repoName: "m3ters.js",
  //   gitRef: "main",
  // });


  // const fetchFileContent = async (data: GithubData) => {
  //   const response = await fetch("http://localhost:3000/api/github/fetch-content", {
  //     body: JSON.stringify(data),
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   setMdContent(await response.text());
  //   console.log("Markdown Content", mdContent);
  // };
  // fetchFileContent({
  //   installationId: 47944306,
  //   repoFullName: "ichristwin/m3ters.js",
  //   repoOwner: "ichristwin",
  //   repoName: "m3ters.js",
  //   gitRef: "979a1e0c5096b8e03c4db8255235f4f38942b488",
  // });

  // if (query.pr && github) {
  //   const fetchDiff = async (data: object) => {
  //     const response = await fetch("http://localhost:3000/api/github/fetch-diff", {
  //       body: JSON.stringify(data),
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     setDiffContent(await response.text());
  //     console.log("Diff Content:", diffContent);
  //   };
  //   fetchDiff({ github: "inkspiff/inkspiff", pr: query.pr });
  // }

  useEffect(() => {
    if (markdownSelected !== markdownId) {
      dispatch(appActions.updateMarkdownSelected(markdownId));
    }
  }, []);

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
        height: {xs: "calc(100% - 56px)", sm: "100%"},
        // border: "3px solid green",
        width:  {xs: "100%", sm: viewSettings.drawer ? "calc(100% - 240px)" : "100%"},
        display: {xs: "auto", sm: "block"},
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
