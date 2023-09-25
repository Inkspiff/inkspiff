import React from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import PaddedContainer from "@/components/layout/PaddedContainer"

const BottomActionCall = () => {

  


  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
        height: "100%",
        // border: "1px solid black",
        width: "100%",
        minHeight: "100vh",
     
        textAlign: "center"
    }}>

      <PaddedContainer >
      <Typography variant="h1" sx={{
        fontWeight: 700,
        textAlign: "center",
        mt: 8,
      }}>
        Try Inkspiff AI for free.
      </Typography>
      <Typography variant="body1" sx={{
        mt: 2,
        mb: 1,
        textAlign: "center",
        fontWeight: 500,
      }}>
        Tap into the power of AI right inside your notes & docs, today.
      </Typography>
      
        <Button variant="contained" size="small" sx={{
          my: 2,
        }}>Get Started</Button>
 
      
      </PaddedContainer>
      
     
    </Box>
  )
}

export default BottomActionCall