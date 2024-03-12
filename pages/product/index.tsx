import Head from "next/head";
import { useState } from "react";
import {useSelector} from "react-redux"
import { RootState } from "@/store";
import Box from "@mui/material/Box"
import Hero from "@/components/home/Hero"
import HomeHeader from "@/components/layout/Header"
import Metrics from "@/components/home/Metrics"
import Features from "@/components/home/Features"
import BottomActionCall from "@/components/ui/BottomActionCall";
import KeyPoints from "@/components/home/KeyPoints"
import HomeFooter from "@/components/layout/Footer"
import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession } from "next-auth/next"
import { getProviders } from "next-auth/react"
import {getAuthOptions} from "@/lib/auth"
import { db } from "@/firebase"
import { DocumentData, QuerySnapshot, collection, query, where, getDocs, orderBy, limit, } from "firebase/firestore";


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, getAuthOptions());
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {

    const markdownsCollection = collection(db, 'markdowns');
    const q = query(markdownsCollection, where("allowedUsers", "array-contains", session.user.id), orderBy('lastEdited', 'desc'), limit(1));

    try {
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
            // There is at least one document matching the user ID
            const markdownDoc = querySnapshot.docs[0];

      

            interface mdType extends DocumentData {
              id: string
            } 

            const md: mdType = {
                id: markdownDoc.id,
                ...markdownDoc.data()
            };
            
            // Process the account data as needed
            console.log({md})
            return { redirect: { destination: `/editor/${md.title.split(" ").join("-")}-${md.id}`} };
            
        } else {
            // No account found for the user ID
            console.log({ message: 'Markdown not found' });
            return { redirect: { destination: `/create-new` } }
        }
    } catch (error) {
        console.error('Error retrieving markdown:', error);
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


export default function Home({ session, providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const app = useSelector((state: RootState) => state.app)



  return (
    <div>
      <Head>
        <title>Inkspill - Create README files is seconds</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <HomeHeader />
      <Box  component="main"
        sx={{
          mt: {sm: "64px", xs: "56px"},
        }}>
          
      <Hero />
      <Metrics />
      <Features />
      <KeyPoints />
      <BottomActionCall />
      </Box>
      <HomeFooter />
    </div>
  );
}
