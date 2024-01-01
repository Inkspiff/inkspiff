import Head from "next/head";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header"
import { Widget } from '@typeform/embed-react'
import Main from "@/components/layout/Main"
import BottomActionCall from "@/components/about/BottomActionCall";
import PaddedContainer from "@/components/layout/PaddedContainer";

export default function Home() {


  return (
    <div>
      <Head>
        <title>Join the Inkspiff waiting list</title>
        {/* <link rel="icon" href="/dog.png" /> */}
      </Head>
      <Header />
      
      <Main sx={{
        pt: 2,
      }}>
      <Widget id="RPm8zVZx" style={{ 
        width: '100%', 
        height: "calc(100vh - 96px - 16px)",
        }} className="feadback-form" />
      </Main>

      <Box component="footer" sx={{
        textAlign: "center",
    }}>
        <PaddedContainer sx={{
            py: 1,
        }}>
           
           {/* <Divider></Divider> */}
           <Typography variant='caption' sx={{
            textAlign: "center",
            
           }}>
            &copy; Inkpiff 2023
           </Typography>
        </PaddedContainer>
    </Box>
    </div>
  );
}
