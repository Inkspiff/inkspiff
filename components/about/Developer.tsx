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
                   Hi there! If you&apos;e reading this, you&apos;e probably like me—spending most of your days in your office, in front of a computer.
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
                   Hi there! If you&apos;e reading this, you&apos;e probably like me—spending most of your days in your office, in front of a computer.
                   </Typography>
                   <Typography variant="body1">
                        
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