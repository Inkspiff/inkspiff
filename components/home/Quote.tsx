import React from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"

interface QuoteInterface {
    text: string,
    by: string,
    from: string,
}

const Quote = ({text, by, from}: QuoteInterface) => {

  return (
    
       

     <Box sx={{
        textAlign: "center",
        px: 2,
     }}>
    
      <Typography variant="body1" component="span" sx={{
            display: "inline-block",
            fontSize: "1.875rem",
            lineHeight: "2.125rem",
            wordBreak: "break-word",
            maxWidth: "600px",
            my: 2,
        }}>
            &lsquo;&lsquo;{text}&rsquo;&rsquo;
        </Typography>
        <Grid container>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
            <Box sx={{
            textAlign: "left",
            display: "none"
        }}>
            <Typography variant="body2" sx={{
                fontWeight: 500,
                fontSize: "0.84375rem",
                lineHeight: "1.1875rem",
                
            }}>
            {by}
            </Typography> 

            <Typography variant="body2" sx={{
                fontSize: "0.84375rem",
                lineHeight: "1.1875rem",
            }}>
            {from}
            </Typography> 
        </Box>
            </Grid>
        </Grid>

        

    </Box>
  )
}

export default Quote