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
             <Typography  variant="h1" component="p" sx={{
                fontWeight: 700,
                // fontSize: {xs: "48px", sm: "64px", md: ""},
                // lineHeight: {xs: "56px", sm: "64px", md: ""},
                letterSpacing: "0.01rem",
                mb: 4,
            }}>Better Code Documentation from READMEs</Typography>

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
                    alignItems: "center",
                    height: "100%",
                    // border: 1,
                }}>
                    <Typography variant="body1">
                   Hi there! If you&apos;re reading this, you&apos;re probably like me—spending most of your days in your office, in front of a computer.
                   </Typography>
                    </Box>
                   
                   
                </Grid>
            </Grid>
        </PaddedContainer>
    </Box>
}

export default Hero