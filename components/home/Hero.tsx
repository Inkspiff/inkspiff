import React from 'react'
import Link from "next/link"
import { useRouter } from "next/navigation"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

const Hero = () => {

  const router = useRouter()


  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "calc(100vh - 64px)",
      // border: "1px solid black",
      width: "100%",
      px: {
        xs: "2rem",
        sm: "4rem",
        md: "8rem"
      }
    }}>
      <Box sx={{
        display: "inline-block",
        textAlign: "center",
        // border: "1px solid black"
      }}>
      <Typography variant="h1" sx={{
        // fontWeight: 700,
        // border: 1,
        mb: 1,
      }}>
        Create <span >great </span><span>readmes</span>, <br/>in <span>seconds.</span>
      </Typography>
      <Typography variant="body1" sx={{
  
        textAlign: "center",
        fontWeight: 500,
        fontSize: "24px",
        maxWidth: {sm: "65%"},
        mx: "auto"
      }}>
        Inkspill is the tool for creating markdown files faster and better.
      </Typography>
      <Link href="/create-new">
      <Button variant="contained" sx={{
        my: 2,
        fontWeight: 500
      }} >Create New .md</Button>
      </Link>
     
      </Box>
      
    </Box>
  )
}

export default Hero