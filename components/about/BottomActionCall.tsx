import React from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

const BottomActionCall = () => {

  


  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
        bgcolor: "#121212",
        borderRadius: "32px",
        boxShadow: 2,
        width: "100%",
        px: {
          xs: "2rem",
          sm: "4rem",
          md: "8rem"
        },
        py: 4,
        textAlign: "center",
        color: "white"
    }}>
      
      <Typography variant="h2" sx={{
        textAlign: "center",
        mt: 8,
      }}>
        Start using Inkspiff for free.
      </Typography>
      <Typography variant="body1" sx={{
        mb: 2,
        textAlign: "center",
        fontWeight: 500,
      }}>
        Try it first (no cards). Pay and use pro features later.
      </Typography>

      <TextField id="name" 
            label="Name"
            variant="outlined"
            size="small"
              inputProps={{
              }}
              sx={{
                mb: 2,
                width: "100%",
                maxWidth: "300px",
              }}
            />
            <TextField id="email" 
            label="Email"
            variant="outlined"
            size="small"
              inputProps={{
              }}
              sx={{
                mb: 2,
                width: "100%",
                maxWidth: "300px",
              }}
            />
      
        <Button variant="contained" size="small" sx={{
          my: 2,
          py: "12px",
          px: "24px",
          borderRadius: 4,
          // bgcolor: "white",
          // color: "#121212", 
          
          }}>Join Inkspiffers</Button>
 
      
    </Box>
  )
}

export default BottomActionCall