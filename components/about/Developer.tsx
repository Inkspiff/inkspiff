import React, {useContext} from "react"
import Image from "next/image"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import PaddedContainer from "@/components/layout/PaddedContainer"
import { ThemeContext } from '@/context/ThemeContext';

import Larry13 from "@/public/illustrations/DrawKit Larry Character Illustration/SVG/DrawKit Larry Character Illustration (13).svg"
import Larry14 from "@/public/illustrations/DrawKit Larry Character Illustration/SVG/DrawKit Larry Character Illustration (14).svg"




const Developer = () => {
    const { toggleTheme, theme} = useContext(ThemeContext);

  const {palette, } = theme
  const {mode } = palette
 
    return <Box>
        <PaddedContainer>
            <Typography variant="body1" component="h1" sx={{
                fontSize: "32px",
                mb: 1, 
            }}>Who&apos;s talking?</Typography>
             <Typography  sx={{
                fontSize: "62px",
                lineHeight: "70px",
                fontWeight: 700,
                letterSpacing: "0.01rem",
                mb: 4,
            }}>Inkspiff&apos;s Creator</Typography>

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
                        <Image src={Larry13} alt="Developers" fill sizes="" />

                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>

                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100%",
                    // border: 1,
                }}>
                    <Typography variant="body1">
                   
                   </Typography>
                   <Typography variant="body1">
                        
                   </Typography>
                </Box>
                   
                </Grid>
                <Grid item xs={12} sm={6}>

                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100%",
                    // border: 1,
                }}>
                    <Typography variant="body1">
                    I'm<Box component="span"  sx={{
                        fontWeight: 600
                   }}> Precious</Box>, aka <Box component="span" sx={{
                        color: "#006de2",
                        fontWeight: 600,
                        textDecoration: "underline",
                        cursor: "pointer"
                   }}><a>@pincode</a></Box>, I am a dev based out of Nigeria. I love to write music and consume business content on youtube.
                   </Typography>
                   <br />
                   <Typography variant="body1">
                   Few weeks ago, I wanted to showcase some of my code projects and so, needed to create some awesome readme files. thought would be a breeze. <Box component="span"  sx={{
                        fontWeight: 600
                   }}>It was'nt</Box>.
                   </Typography>
                   <br/>
                   <Typography variant="body1">
                   My bad markdown knowledge and ugly writing, found zero jouy in the <Box component="span"  sx={{
                        fontWeight: 600
                   }}>lack of automation</Box>/standadization in the process. I had to juggle a dozen different tools to get really readmes. That's why we're here.
                   </Typography>
                </Box>
                   
                </Grid>
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
                        <Image src={Larry14} alt="Developers" fill sizes="" />

                    </Box>
                </Grid>
            </Grid>
        </PaddedContainer>
    </Box>
}

export default Developer