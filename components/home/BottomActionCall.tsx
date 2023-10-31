import React, {useContext} from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { ThemeContext } from '@/context/ThemeContext';

const BottomActionCall = () => {
  const { toggleTheme, theme} = useContext(ThemeContext);

  const {palette, } = theme
  const {mode } = palette
  
  


  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
        bgcolor: "#121212",
        borderRadius: "32px 32px 0 0",
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
        mb: 1,
        textAlign: "center",
        fontWeight: 500,
      }}>
        Try it first (no cards). Pay and use pro features later.
      </Typography>
      
        <Button variant="contained" size="small" sx={{
          my: 2,
          py: "12px",
          px: "24px",
          borderRadius: 4,
          // bgcolor: "white",
          // color: "#121212", 
          bgcolor: "white" ,
          color:"#121212" ,
          "&:hover": {
            bgcolor: "#f0f0f0",
          }
          }}>Join Inkspiffers</Button>
 
      
    </Box>
  )
}

export default BottomActionCall