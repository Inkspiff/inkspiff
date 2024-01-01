import React, {useContext} from "react"
import Image from "next/image"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import PaddedContainer from "@/components/layout/PaddedContainer"
import { ThemeContext } from '@/context/ThemeContext';


import Ill1 from "@/public/illustrations/about-page/1.svg"
import Ill1Alt from "@/public/illustrations/about-page/1-alt.svg"


const Hero = () => {
    const { toggleTheme, theme} = useContext(ThemeContext);

  const {palette, } = theme
  const {mode } = palette

    return <Box>
        <PaddedContainer>
            <Typography variant="body1" component="h1" sx={{
                fontSize: "32px",
                mb: 1, 
            }}>About Inkspiff</Typography>
             <Typography   component="p" sx={{
                 fontSize: "62px",
                 lineHeight: "70px",
                 fontWeight: 700,
                 letterSpacing: "0.01rem",
                 mb:4,
            }}>Better Code <Box component={"span"} sx={{
                display: {xs: "auto", sm: "none"}
            }}>Docs</Box><Box component={"span"} sx={{
                display: {xs: "none", sm: "inline"}
            }}>Documentation</Box> from READMEs</Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <Box sx={{
                        position: "relative",
                        width: "100%",
                        height: "300px",
                        bgcolor: mode === "dark" ? "grey.A200" : "",
                        borderRadius: mode === "dark" ? "6px" : "",
                        borderBottom: "2px solid",
                        borderColor: 'primary.main',
                        "& img": {
                            objectFit: "contain"
                        }


                    }}>
                        
                        <Image src={Ill1} alt="Developers" fill sizes="" />

                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100%",
                    // border: 1,
                }}>
                    <Typography variant="body1">
                   Hi there! If you&apos;re reading this, you&apos;re probably like me—spending most of your days in front of a computer.
                   </Typography>
                   <br/>
                   <Typography variant="body1">
                   But there's one issue I face after working on one of those incomplete projects! <Box component="span"  sx={{
                        fontWeight: 600,
                        // textDecoration: "underline",
                   }}> Proper documentation</Box>. Yeah, Lets face it. that shit is boring. But we have to do it. that's why I made Inkspiff.
                   </Typography>
                   <br/>
                   <Typography variant="body1">
                   Want to create readmes in seconds? me too. Want your readmes to look mad? I feel you. Need a one stop platform for managing all your readmes. <Box component="span"  sx={{
                        fontWeight: 600,
                        // textDecoration: "underline",
                   }}> Say no more</Box>.
                   </Typography>
                    </Box>
                   
                   
                </Grid>
            </Grid>
        </PaddedContainer>
    </Box>
}

export default Hero