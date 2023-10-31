import Head from "next/head";
import Divider from "@mui/material/Divider"
import Hero from "@/components/about/Hero"
import Inkspiff from "@/components/about/Inkspiff"
import Developer from "@/components/about/Developer"
import Header from "@/components/layout/Header"
import Main from "@/components/layout/Main"
import BottomActionCall from "@/components/about/BottomActionCall";
import PaddedContainer from "@/components/layout/PaddedContainer"


export default function Home() {
  // const app = useSelector((state: RootState) => state.app)


  return (
    <div>
      <Head>
        <title>Inkspill - Create README files is seconds</title>
        {/* <link rel="icon" href="/dog.png" /> */}
      </Head>
      <Header />
      <Main>
        
        
       <Hero />
      <Divider />

      <Developer />
      <Divider />

        <Inkspiff />
        <Divider />
        
        <PaddedContainer >
            <BottomActionCall />
        </PaddedContainer>

        <Divider />
        
      </Main>
    </div>
  );
}
