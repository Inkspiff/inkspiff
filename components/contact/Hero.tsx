import React from "react"
import Image from "next/image"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import PaddedContainer from "@/components/layout/PaddedContainer"


const Hero = () => {
    return <Box sx={{
        textAlign: "center"
    }}>
            <Typography variant="h1" component="h1" sx={{
               mb: 2
            }}>Contact Inkspiff</Typography>
             <Typography variant="body1" sx={{
               mb: 2
            }}>What is it gonna be?</Typography>

    </Box>
}

export default Hero