import Head from "next/head";
import { useState } from "react";
import {useSelector} from "react-redux"
import { RootState } from "@/store";
import Divider from "@mui/material/Divider"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Header from "@/components/layout/Header"
import Main from "@/components/layout/Main"
import BottomActionCall from "@/components/ui/BottomActionCall";
import Footer from "@/components/layout/Footer"
import PricingPlans from "@/components/plans/PricingPlans"
import PaddedContainer from "@/components/layout/PaddedContainer"
import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession } from "next-auth/next"
import { getProviders } from "next-auth/react"
import {authOptions} from "@/lib/auth"

import ViewTemplate from "@/components/templates-page/ViewTemplate";
import TemplatesList from "@/components/editor/templates/TemplatesList";
import { db } from "@/firebase"
import { DocumentData, QuerySnapshot, collection, query, where, getDocs, orderBy, limit, doc, getDoc } from "firebase/firestore";
import { TemplateType } from "@/types";



// get params

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  const { params } = context;


 

  
  const providers = await getProviders();
  
  return {
    props: { 
      session: session,
      providers: providers ?? [],
    },
  }
}


export default function Home({ session, providers, }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const app = useSelector((state: RootState) => state.app)



  return (
    <div>
      <Head>
        <title>Inkspill - Create README files is seconds</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <Header />
      <Main>
         

      <Divider />

      <PaddedContainer>
      <BottomActionCall />
      </PaddedContainer>
      
      <Divider />

      </Main>
      <Footer />
    </div>
  );
}
