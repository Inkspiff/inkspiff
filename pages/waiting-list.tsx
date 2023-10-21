import Head from "next/head";
import { useState } from "react";
import {useSelector} from "react-redux"
import { RootState } from "@/store";
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Input from "@mui/material/Input"
import Box from "@mui/material/Box"
import HomeHeader from "@/components/layout/Header"
import BottomActionCall from "@/components/ui/BottomActionCall";
import HomeFooter from "@/components/layout/Footer"
import PaddedContainer from "@/components/layout/PaddedContainer"
import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession } from "next-auth/next"
import { getProviders } from "next-auth/react"
import {authOptions} from "@/lib/auth"
import { db } from "@/firebase"
import { DocumentData, QuerySnapshot, collection, query, where, getDocs, orderBy, limit, } from "firebase/firestore";


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
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

  console.log({session})

  const handleJoin = () => {
    console.log("join")
  }

  return (
    <div>
      <Head>
        <title>Join the Inkspiff waiting list</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <HomeHeader />
      <Box  component="main"
        sx={{
          mt: {sm: "64px", xs: "56px"},
        }}>
          
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // justifyContent: "center",
            minHeight: "calc(100vh - 64px)",
            // border: "1px solid black",
            width: "100%",
            px: {
                xs: "2rem",
                sm: "4rem",
                md: "8rem"
            }
            }}>
            <Box sx={{
                display: "inline-block",
                textAlign: "center",
                // border: "1px solid black"
            }}>
                <Typography variant="h1" sx={{
                    fontWeight: 700,
                    mb: 4,
                    mt: 4
                }}>
                
                 Join the Inkspiff waiting list
                </Typography>
                <Box>
                    <Input placeholder="Email" 
                        inputProps={{
                            sx: {
                                border: "1px solid green"
                            },
                            "&::placeholder": {
                                color: "#d6d5d5"
                            }
                        }} 
                        slotProps={{
                            // sx: {
                            //     border: "1px solid blue"
                            // }
                        }} 
                        sx={{
                            py: 0.5,
                            px: 2,
                            bgcolor: "#efefef",
                            color: "white",
                            borderRadius: 2,
                            borderBottom: 0,
                            outlineBottom: 0,

                            
                        }} 
                    />

                    <Button variant="contained" onClick={handleJoin} sx={{
                        my: 2,
                        mb:4,
                        fontWeight: 500
                    }} size="small">Get early access</Button>
                </Box>
                

         
             </Box>
           
            <Typography variant="body2" sx={{
                
                // textAlign: "center",
                fontWeight: 500,
                fontSize: {xs: "18px", sm: "24px"},
                maxWidth: {sm: "65%"},
                mx: "auto"
            }}>
                Are you tired of spending hours crafting documentation for your code projects? Do you wish there was a smarter, more efficient way to generate readme files and collaborate with your team on code documentation? Look no further—Inkspiff is here to revolutionize your code documentation workflow.
            </Typography>
            
            </Box>

            <Box>
                <PaddedContainer>
                    <Typography sx={{
                        pl: 2,
                        borderLeft: "1px solid #121212",
                        fontSize: {xs: "1.5rem", sm: "2rem"},
                        fontWeight: "300",
                    }}>
                        At Inkspiff, we believe that creating comprehensive readme files and maintaining code documentation should be a breeze. That's why we've harnessed the power of generative AI and collaboration features to simplify the process and make it more enjoyable.
                    </Typography>
                </PaddedContainer>
            </Box>


            <Box>
                <PaddedContainer>
                    <Typography sx={{
                        pl: 2,
                        borderLeft: "1px solid #121212",
                        fontSize: {xs: "1.5rem", sm: "2rem"},
                        fontWeight: "300",
                    }}>
                        At Inkspiff, we believe that creating comprehensive readme files and maintaining code documentation should be a breeze. That's why we've harnessed the power of generative AI and collaboration features to simplify the process and make it more enjoyable.
                    </Typography>
                </PaddedContainer>
            </Box>


            {/* Why Join */}

            <Box>
                <PaddedContainer>
                    <Typography variant="h2" sx={{
                       textAlign: "center",
                    }}>
                       Why join our waiting list?
                    </Typography>

                    <Box>
                        <Box>
                            <Typography variant="h4">
                            Be the First to Access Inkspiff: 
                            </Typography>

                            <Typography variant="body2">
                            By joining our waiting list, you'll be among the first to experience the future of code documentation. Get exclusive early access and be a part of the Inkspiff community from the very beginning. 
                            </Typography>
                        </Box>
                    </Box>
                </PaddedContainer>
            </Box>
      

            {/* How to Join */}
            <Box>
                <PaddedContainer>
                    <Typography variant="h2" sx={{
                       textAlign: "center",
                    }}>
                       How to Join
                    </Typography>

                    <Box component="ul">
                        <Box component="li">
                            Pop your email into the box below.
                        </Box>
                        <Box component="li">
                            Hit the "Join the Waiting List" button.
                        </Box>
                        <Box component="li">
                            Keep an eye on your inbox for exclusive access and news from Inkspiff.
                        </Box>
                    </Box>

                    <Typography>
                    Don't miss out on the code documentation revolution! Join the Inkspiff waiting list now and say goodbye to documentation headaches.
                    </Typography>
                </PaddedContainer>
            </Box>


            <BottomActionCall />
      </Box>
      <HomeFooter />
    </div>
  );
}
