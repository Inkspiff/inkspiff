import React from 'react';
import Head from "next/head";
import Box from "@mui/material/Box"
import HomeHeader from "@/components/layout/Header"
import HomeFooter from "@/components/layout/Footer"
import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession } from "next-auth/next"
import { getProviders } from "next-auth/react"
import {getAuthOptions} from "@/lib/auth"
import { Button, Input } from "@mui/material";


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, getAuthOptions());
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    // 
  }

  const providers = await getProviders();
  
  return {
    props: { 
      session: session,
      providers: providers ?? [] 
    },
  }
}


export default function Admin({ session, providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const app = useSelector((state: RootState) => state.app)
  console.log({session})
  const [markdownId , setMarkdownId] = React.useState<string | null>(null)

  const handleDelete = async () => {
    const res = await fetch('/api/db/delete-markdown', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: markdownId }),
    })

    if (res.status === 200) {
      console.log("deleted")
    } else {
        console.log("not deleted")
    }
  }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMarkdownId(event.target.value);
    };


  return (
    <div>
      <Head>
        <title>Inkspiff - Create README files is seconds</title>
      </Head>
      <HomeHeader />
      <Box  component="main"
        sx={{
          mt: {sm: "64px", xs: "56px"},
        }}>
            <Input value={markdownId || ""} onChange={handleChange} />
          
            <Button onClick={() => handleDelete()}>Delete</Button>
      </Box>
      <HomeFooter />
    </div>
  );
}
