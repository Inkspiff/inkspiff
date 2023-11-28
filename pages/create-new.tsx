import Head from "next/head";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import View from "@/components/editor/layout/View";
import { useRouter } from "next/router";
import Templates from "@/components/templates/Templates";
import CreateNew from "@/components/create/CreateNew";
import Navbar from "@/components/editor/layout/Navbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UseAI from "@/components/use-ai/use-ai";
import { TemplateType } from "@/types";
import AppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import Avatar from '@mui/material/Avatar';
import { useSession, signIn, signOut } from "next-auth/react";
import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession } from "next-auth/next"
import { getProviders } from "next-auth/react"
import {authOptions} from "@/lib/auth"


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  

  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  // if (!session) {
  //  return { redirect: { destination: `/login` } }
  // }

  const providers = await getProviders();
  
  return {
    props: { 
      session: session,
      providers: providers ?? [] 
    },
  }
}


export default function CreateNewPage({ session, providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()
  const dispatch = useDispatch()
  
  // const app = useSelector((state: RootState) => state.app)

 

  return (
    <div>
      <Head>
        <title>Create new README | Inkspiff</title>
      </Head>
      <AppBar  sx={{
        bgcolor: "white",
        height: "45px",
        position: "fixed"
      }}
      elevation={0}>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: '100%',
          // height: "45px",
          px: 1,
          py: 0,
        }}
      >

        <Box  onClick={() => {router.back()}} sx={{
                color: "#121212",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                ml: 2,
                mt: 2,
              }}>
          <ChevronLeftRoundedIcon sx={{
            m: 0
          }} /> 
          <Typography variant="body2" sx={{
            p: 0,
            lineHeight: "14px",
          }}>Back </Typography>
        </Box>
          
          <Box>
          <Avatar alt="Remy Sharp" src={session ? session.user.image! : "https://picsum.photos/id/237/200/300.jpg" } 
          sx={{
             bgcolor: "#f6f5f4",
             width: 24,
             height: 24,
             margin: 0,
             cursor: "pointer",
             borderRadius: "4px",
       
              mr: 2,
              mt: 2,
          }} >
            R
            </Avatar>
          </Box>
        </Box>
      </AppBar>
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
        <CreateNew />
        
      </Box>
    </div>
  );
}
