import Head from "next/head";
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import HomeHeader from "@/components/layout/Header"
import Features from "@/components/home/Features";
import PaddedContainer from "@/components/layout/PaddedContainer"
import WhyJoin from "@/components/home/WhyJoin";
import BottomActionCall from "@/components/home/BottomActionCall";
import Quote from "@/components/home/Quote";
import Hero from "@/components/home/Hero";
import Footer from "@/components/layout/Footer";



export default function Home() {


  return (
    <div>
      <Head>
        <title>Join the Inkspiff waiting list</title>
        {/* <link rel="icon" href="/dog.png" /> */}
      </Head>
      <HomeHeader />
      <Box  component="main"
        sx={{
          mt: {sm: "64px", xs: "56px"},
        }}>
          
          <Hero />

           
            


            <Features />

            <Box>
                <PaddedContainer sx={{
                  py: 8
                }}>
                    <Typography sx={{
                        pl: 2,
                        borderLeft: "2px solid #121212",
                        fontSize: {xs: "1.5rem", sm: "2rem"},
                        fontWeight: 400,

                    }}>
                        At Inkspiff, we believe that creating comprehensive readme files and maintaining code documentation should be a breeze. That's why we've harnessed the power of generative AI and collaboration features to simplify the process and make it more enjoyable.
                    </Typography>
                </PaddedContainer>
            </Box>
    

            <Quote
            text="We got rid of nearly a dozen different tools because of what Inskpill does for us."
            by="Precious Nwaoha"
            from="Software Developer, Patentic"
          />

            <WhyJoin />

            

            <BottomActionCall />

            <Footer />
      </Box>
    </div>
  );
}
