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
import {getAuthOptions} from "@/lib/auth"

import ViewTemplate from "@/components/templates-page/ViewTemplate";
import TemplatesList from "@/components/editor/templates/TemplatesList";
import { db } from "@/firebase"
import { DocumentData, QuerySnapshot, collection, query, where, getDocs, orderBy, limit, doc, getDoc } from "firebase/firestore";
import { TemplateType } from "@/types";



// get params

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, getAuthOptions());
  
  const { params } = context;


  const templatesCol = collection(db, 'templates')

  let templates: TemplateType[] | null = null;

  try {
    const querySnapshot = await getDocs(templatesCol);

    if (!querySnapshot.empty) {

      

      templates = querySnapshot.docs.map(doc => {
        const docData = doc.data()

        return {
          id: doc.id as string,
          name: docData!.name as string,
          content: docData!.content as string,
          description: docData!.description as string,
          creator: {
              email: docData!.creator.email as string,
              name: docData!.creator.name as string,
              image: docData!.creator.image as string,
              id: docData!.creator.id as string,
              emailVerified: docData!.creator.emailVerified as boolean,
          },
          type: docData!.type as 'free' | 'pro',
          categories: docData!.categories as string[],
          includes: docData!.includes as string[],
          views: docData!.views as number,
          image: docData!.image as string,
        }
      })

      console.log({templates})

    } else {
        // no templates
    }

  } catch (error) {
    console.error('Error retrieving template:', error);
        // redirect to err
        return {redirect: { destination: `/` } }
  }

  if (templates === null) {
    return {redirect: {destination: "/"}}
  }

  // const template = templates.filter(temp => {
  //   return (temp.name.toLowerCase()  === (params!['template-id'] as string ).replace("-", " ").toLowerCase())
  // )[0]

  const template = templates.filter(temp => {
      return (temp.id  === (params!['template-id'] as string ))
    }
  )[0]

  const providers = await getProviders();
  
  return {
    props: { 
      session: session,
      providers: providers ?? [],
      template: template,
      templates: templates
    },
  }
}


export default function Home({ session, providers, template, templates}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const app = useSelector((state: RootState) => state.app)



  return (
    <div>
      <Head>
        <title>Inkspill - Create README files is seconds</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <Header />
      <Main>
          <PaddedContainer sx={{
          }}>
          <ViewTemplate template={template}/>
          </PaddedContainer>
    
        <Divider />

        <PaddedContainer>
        <Typography variant="h4" component="h2" sx={{
          mb: 4
        }}>
        More templates to power your workspace
        </Typography>
      <TemplatesList templates={templates} />
        </PaddedContainer>
        

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
