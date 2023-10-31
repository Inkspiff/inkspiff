import React from "react"
import Link from "next/link"
import Image from "next/image"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import PaddedContainer from "@/components/layout/PaddedContainer"


const NEWS_LIST =[
    {
        brand: "the verge",
        logo: "",
        link: "",
    }
]

const News = () => {
    return <Box>
        <PaddedContainer>
        <Typography variant="h2" sx={{
                mb: 1, 
            }}>In the news</Typography>
            <Typography variant="body1" sx={{
            }}>Just a few of the stories about Notion in the tech and business press.</Typography>

            <Grid container spacing={4}>
                {NEWS_LIST.map((news, index) => {
                    return <Grid key={index} item xs={2} sm={3}>
                        <Paper elevation={0} sx={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: {xs: "100px", sm: "150px"}
                        }}>

                        </Paper>
                    </Grid>
                })}
                
            </Grid>
           
        </PaddedContainer>

        
    </Box>
}

export default News