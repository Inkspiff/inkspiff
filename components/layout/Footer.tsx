import React from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import PaddedContainer from "@/components/layout/PaddedContainer"


const Footer = () => {

  return (
    <Box sx={{
        bgcolor: "#121212",
        color: "white",
        textAlign: "center",
    }}>
        <PaddedContainer sx={{
            py: 1,
        }}>
           
           {/* <Divider></Divider> */}
           <Typography variant='caption' sx={{
            textAlign: "center",
            
           }}>
            &copy; Inkpiff 2023
           </Typography>
        </PaddedContainer>
    </Box>
  )
}

export default Footer