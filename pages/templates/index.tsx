import React from "react"
import Head from "next/head";
import { useState } from "react";
import {useSelector} from "react-redux"
import { RootState } from "@/store";
import Grid from "@mui/material/Grid"
import Divider from "@mui/material/Divider"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Header from "@/components/layout/Header"
import Main from "@/components/layout/Main"
import BottomActionCall from "@/components/ui/BottomActionCall";
import Footer from "@/components/layout/Footer"
import PricingPlans from "@/components/plans/PricingPlans"
import PaddedContainer from "@/components/layout/PaddedContainer"
import TemplateSlide from "@/components/templates-page/TemplateSlide";
import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession } from "next-auth/next"
import { getProviders } from "next-auth/react"
import {authOptions} from "@/lib/auth"
import TemplatesList from "@/components/editor/templates/TemplatesList";
import SubmitATemplate from "@/components/templates-page/SubmitATemplate";
import SearchTemplatesSide from "@/components/templates-page/SearchTemplatesSide";
import { db } from "@/firebase"
import { DocumentData, QuerySnapshot, collection, query, where, getDocs, orderBy, limit, doc, getDoc } from "firebase/firestore";
import { TemplateType } from "@/types";
import Input from '@mui/material/Input';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    
  }

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

  const providers = await getProviders();
  
  return {
    props: { 
      session: session,
      providers: providers ?? [],
      templates: templates,
    },
  }
}


export default function Home({ session, providers, templates }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const app = useSelector((state: RootState) => state.app)
    const [value, setValue] = React.useState<string>("")



  return (
    <div>
      <Head>
        <title>Inkspill - Create README files is seconds</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <Header />


      <Main>
          <Grid container >
            {/* <Grid xs={0} sm={0} sx={{
              // border: "1px solid red"
            }}>
              <SearchTemplatesSide />
            </Grid> */}
            <Grid xs={0} sm={12} sx={{
              
              // border: "1px solid red"
            }}>
            <Box >
        <PaddedContainer sx={{
          px: {xs: 2, md: 4},
          py: {xs: 2, md: 4},
        }}>
          <Box sx={{
            mb: 4,
            bg: "grey.A100",
            width: "100%",
            height: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: 'column',
            textAlign: "center",
          }}>
          <Typography variant="h1" sx={{
          mb: 2
        }}>Template Gallery</Typography>
        <Typography variant="body1" sx={{
          mb: 2
        }}>Real Inkspiff markdowns made by our team and community.<br/>Try new setups or share your own.</Typography>

        <Input 
        value={value} 
        placeholder={"Search..."}
        endAdornment={<SearchOutlinedIcon />}
        disableUnderline={true}
        sx={{
          border: "1px solid",
          borderColor: "grey.A200",
          borderRadius: "6px",
          px: 1,
          "& .MuiInput-input": {
            // border: "1px solid blue",
          borderRadius: "6px",
          },

          "&:hover": {
            oultine: "none"
          }
        }}  
        type="search"
        />
        
          </Box>

        <TemplateSlide templates={templates} />

        <SubmitATemplate />


        <Typography variant="h3" component="h2" sx={{
          mb: 2
        }}>Inkspiff picks</Typography>
        <Typography variant="body1" component="p" sx={{
          mb: 2
        }}>Standout templates from the community, curated by the Inkspiff team. Try the most effective styles to document your work and life. And discover new, creative ways to use Inkspiff.</Typography>

        <TemplatesList templates={templates}/>
        </PaddedContainer>
        
      </Box>
            </Grid>
          </Grid>
      
      <Divider />
      </Main>
      <Footer />
    </div>
  );
}
