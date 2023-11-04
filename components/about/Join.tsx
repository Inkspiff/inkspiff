import React from "react"
import Link from "next/link"
import Image from "next/image"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import PaddedContainer from "@/components/layout/PaddedContainer"
import Share from "../share"


const Join = () => {
    return <Box>
            
            <Grid container spacing={4} sx={{
                // mb: 1,
            }}> 
                <Grid item xs={12} sm={6}>
                <Typography variant="h2" sx={{
                mb: 1, 
            }}>Join</Typography>
             <Typography variant="body1" sx={{
                mb: 1,
            }}>It starts and ends with you. Help us get to more people by sharing Inskpiff with dev communities and friends.</Typography>

                    <Share showText={false} />
                </Grid>
                
            </Grid>
            <Typography>
        Interested in giving us insight? <Link href="/feedback"><Box component={"span"} sx={{
            cursor: "pointer",
            textDecoration: "underline"
        }}>Take our survey</Box></Link>👈

        </Typography>

        
    </Box>
}

export default Join