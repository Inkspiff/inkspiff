import React from "react"
import Image from "next/image"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import PaddedContainer from "@/components/layout/PaddedContainer"


const Developer = () => {
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
                        height: "200px",
                        // bgcolor: "grey.A200",
                        // borderRadius: "6px",
                        borderBottom: "2px solid",
                        borderColor: 'primary.main',
                        "& img": {
                            objectFit: "contain"
                        }


                    }}>
                        {/* <Image src="/img/logo-black.png" alt="Developers" fill sizes="" /> */}

                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                   <Typography variant="body1">
                   Hi there! If you&apos;'e reading this, you&apos;'e probably like me—spending most of your days in your office, in front of a computer.
                   </Typography>
                   <Typography variant="body1">
                        
                   </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                   <Typography variant="body1">
                   Hi there! If you&apos;'e reading this, you&apos;'e probably like me—spending most of your days in your office, in front of a computer.
                   </Typography>
                   <Typography variant="body1">
                        
                   </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                <Box sx={{
                        position: "relative",
                        width: "100%",
                        height: "200px",
                        // bgcolor: "grey.A200",
                        // borderRadius: "6px",
                        borderBottom: "2px solid",
                        borderColor: 'primary.main',
                        "& img": {
                            objectFit: "contain"
                        }


                    }}>
                        {/* <Image src="/img/logo-black.png" alt="Developers" fill sizes="" /> */}

                    </Box>
                </Grid>
            </Grid>
        </PaddedContainer>
    </Box>
}

export default Developer