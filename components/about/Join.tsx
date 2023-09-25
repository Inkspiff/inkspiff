import React from "react"
import Link from "next/link"
import Image from "next/image"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import PaddedContainer from "@/components/layout/PaddedContainer"


const Join = () => {
    return <Box>
            
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                <Typography variant="h2" sx={{
                mb: 1, 
            }}>Join</Typography>
             <Typography variant="body1" sx={{
            }}>Notion is based in the sunny Mission district of San Francisco. We are a diverse group of people interested in computing, history, art, alternative programming languages, and skateboarding.</Typography>

                    
                </Grid>
                
            </Grid>
            <Typography>
        Interested in joining us? <Link href="/about">Learn more here</Link>👈


        </Typography>

        
    </Box>
}

export default Join