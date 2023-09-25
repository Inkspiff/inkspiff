import React from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

const BottomActionCall = () => {

  


  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
        // border: "1px solid black",
        width: "100%",
        px: {
          xs: "2rem",
          sm: "4rem",
          md: "8rem"
        },
        textAlign: "center"
    }}>
      
      <Typography variant="h1" sx={{
        fontWeight: 700,
        textAlign: "center",
        mt: 8,
      }}>
        Start using Inkspill for free.
      </Typography>
      <Typography variant="body1" sx={{
        mt: 2,
        mb: 1,
        textAlign: "center",
        fontWeight: 500,
      }}>
        Try it first (no cards). Pay and use pro features later.
      </Typography>
      
        <Button variant="contained" size="small" sx={{
          my: 2,
        }}>Try Inkspill free</Button>
 
      
    </Box>
  )
}

export default BottomActionCall