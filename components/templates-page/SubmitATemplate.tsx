import React from "react"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded"

const SubmitATemplate = () => {

    const handleSubmit = () => {
        console.log("submit template")
    }
    
    return <Paper elevation={0} sx={{
        bgcolor: "action.hover",
        mb: 2,
    }} >
        <Grid container spacing={2} sx={{
            p: 4,
        }}>
                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" component="h3" sx={{
                        mb: 2,
                    }}>
                        Share your best creations with the Inkspiff Community
                    </Typography>
                    <Button variant="outlined" onClick={handleSubmit}>Submit a template <ArrowRightRoundedIcon /></Button>
                </Grid>

        </Grid>
        </Paper>
        
}

export default SubmitATemplate