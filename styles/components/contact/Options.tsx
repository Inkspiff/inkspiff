import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"

const OPTS = [
    {
        text: "Email Us",
        link: "/contact",
        subtext: "Get Intouch",
    },
    {
        text: "Feedback",
        link: "/contact",
        subtext: "Get Intouch",
    },
    {
        text: "Support",
        link: "/contact",
        subtext: "Get Intouch",
    },
]

const Options = () => {
    return <Grid container spacing={2}>
        
            {OPTS.map((opt, index) => {
                return <Grid key={index} item xs={6} sm={4}>
                    <Paper  elevation={0} variant="outlined" sx={{
                    height: "100px",
                    // width: "100%",
                    borderRadius: "6px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    
                    <Typography variant="h6">{opt.text}</Typography>
                    <Typography variant="body1">{opt.subtext}</Typography>
                </Paper>
                </Grid>
            })}
        
    </Grid>
}

export default Options