import Head from "next/head";
import { useState } from "react";
import {useSelector} from "react-redux"
import { RootState } from "@/store";
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Header from "@/components/layout/Header"
import Metrics from "@/components/home/Metrics"
import BottomActionCall from "@/components/ui/BottomActionCall";
import KeyPoints from "@/components/home/KeyPoints"
import Footer from "@/components/layout/Footer"
import Main from "@/components/layout/Main"
import Compare from "@/components/ai-page/Compare"
import Features from "@/components/ai-page/Features"
import Try from "@/components/ai-page/Try"
import Hero from "@/components/ai-page/Hero"
import VideoSection from "@/components/ai-page/VideoSection";
import Quote from "@/components/home/Quote"
import PaddedContainer from "@/components/layout/PaddedContainer";
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
      <Header />
      <Main>
          <Hero />
      {/* <VideoSection /> */}
      <Divider />
      <PaddedContainer >
        <Features />
        {/* <Compare /> */}
        <Quote text="This is the best tool for creating markdowns that i've used to date." from="inkspiff" by="precious nwaoha" />
      </PaddedContainer>

      <Divider />

      <Try />
      
     <Divider />
      </Main>

      <Footer />
    </div>
  );
}
