import React, {useEffect} from "react"
import Head from "next/head";
import { useState } from "react";
import { useSelector , useDispatch} from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import Link from "next/link"
import View from "@/components/editor/layout/View";
import Templates from "@/components/templates-page/Templates";
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
import LoginModal from "@/components/auth/login-modal"
import ImportPopup from "@/components/editor/popups/ImportPopup"
import ExportPopup from "@/components/editor/popups/ExportPopup"
import TemplatesPopup from "@/components/editor/templates/TemplatesPopup"
import FeedbackPopup from "@/components/editor/popups/FeedbackPopup";
import { db } from "@/firebase"
import { doc, getDoc } from "firebase/firestore";


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const slug = context.params!['random-slug'] as string

  if (!session) {
    return { redirect: { destination: "/login" } };
  }

  // Validate the slug and extract the markdown ID
  const match = slug.match(/^(.*-)?([a-zA-Z0-9_]+)$/);

  if (!match) {
    // The slug is invalid
    return {
      notFound: true,
    };
  }

  const markdownId = match[2];

  const docRef = doc(db, "markdowns", markdownId);
  
  // TOD0: check if the markdown ID exists in the database
  
  console.log({markdownId}, session.user.id)

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const docTitle = docSnap.data().title
        const docTitleWithDashes = docTitle.trim().split(" ").join("-")
        console.log("Document exists!");
        // Get user access level
        const memberRef = doc(db, "markdowns", markdownId, "members", session.user.id)

        const memberDocSnap = await getDoc(memberRef)
        if (memberDocSnap.exists()) {
            const access =  memberDocSnap.data().access
            console.log({access})
            if (access === 'owner' || access === 'edit') {
                return {
                    redirect: {
                    destination: `/editor/${docTitleWithDashes}-${markdownId}`,
                    },
                };
            } else {
                return {
                    redirect: {
                    destination: `/view/${docTitleWithDashes}-${markdownId}`,
                    },
                };
            }
        } else {
            console.log({ message: "No such member!" });
            return {
                notFound: true,
            };
        }
    } else {
        console.log("No such document!");
        return {
          notFound: true,
        };
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true,
    }
  }
  
}


export default function App({ session, providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {



  return (
    <div>
      <Head>
        <title>Create README | Inkspill</title>
      </Head>
      
      <Box>
        
      </Box>
    </div>
  );
}


