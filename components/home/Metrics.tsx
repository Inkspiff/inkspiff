import React from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

const Metrics = () => {

  


  return (
    <Box sx={{
        height: "100%",
        // border: "1px solid black",
        width: "100%",
        px: {
          xs: "2rem",
          sm: "4rem",
          md: "8rem"
        }
    }}>
      
      <Typography variant="h2" sx={{
        fontWeight: 700,
        textAlign: "center",
        mt: 8,
      }}>
        Lots of Developers use Inkspill
      </Typography>
      <Typography variant="body1" sx={{
        my: 1,
        textAlign: "center",
        fontWeight: 500,
        fontSize: "1rem"
      }}>
        Enabling the world’s best projects, from simple ideas to the mainstream.
      </Typography>
      
      <Box>
      <Typography variant="h3" component="p" sx={{
        my: 4,
        textAlign: "center",
        fontWeight: 300,
      }}>
        400 monthly users
      </Typography>
      </Box>
      <Box>
        {/* companies */}
      </Box>
    </Box>
  )
}

export default Metrics