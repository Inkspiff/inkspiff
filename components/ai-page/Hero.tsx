import React from 'react'
import { useRouter } from "next/navigation"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import PaddedContainer from '@/components/layout/PaddedContainer'

const Hero = () => {

  const router = useRouter()

  const handleCreateNew = () => {
    // This forces a cache invalidation.
    // router.refresh()

    router.push("/create-new")
  }


  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "calc(100vh - 64px)",
      // border: "1px solid black",
      width: "100%",
      
    }}>
      <PaddedContainer>
      <Box sx={{
        display: "inline-block",
        textAlign: "center",
        // border: "1px solid black"
      }}>
      <Typography variant="h1" sx={{
        fontWeight: 700,
      }}>
        Welcome to Inkspiff AI
      </Typography>
      <Typography variant="body1" sx={{
  
        textAlign: "center",
        fontWeight: 700,
        fontSize: "24px",
        maxWidth: {sm: "65%"},
        mx: "auto"
      }}>
        Access the limitless power of AI, right inside Inkspiff. Work faster. Write better. be productive.
      </Typography>
      <Button variant="contained" onClick={handleCreateNew} sx={{
        my: 2,
      }} size="small">Get Started</Button>
      </Box>
      
      </PaddedContainer>
     
    </Box>
  )
}

export default Hero