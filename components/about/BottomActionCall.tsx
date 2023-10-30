import React, {useContext, useState} from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { ThemeContext } from '@/context/ThemeContext';

const BottomActionCall = () => {
  const { toggleTheme, theme} = useContext(ThemeContext);

  const {palette, } = theme
  const {mode } = palette


  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleJoin = async () => {

    setLoading(true)
    const response = await fetch("/api/db/join-waitlist", {
      headers: {
        "Content-Type": "application/json",
      },
      
      method: "POST",

      body: JSON.stringify({
        name: name,
        email: email
      })
    })

    setLoading(false)

    if (!response?.ok) {
      // handle wahalas
    } 

    const json = await response.json()

    console.log({json})
    
  }
  


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
                onChange: handleNameChange
              }}
              sx={{
                mb: 2,
                width: "100%",
                maxWidth: "300px",
                
                '& label.Mui-focused': {
                  color: '#A0AAB4',
                },
                '& label': {
                  color: '#A0AAB4',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#B2BAC2',
                },
                '& .MuiOutlinedInput-root': {
                  color: "white",
                  '& fieldset': {
                    borderColor: '#E0E3E7',
                  },
                  '&:hover fieldset': {
                    borderColor: '#B2BAC2',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6F7E8C',
                  },
                 
                },
              }}

            />
            <TextField id="email" 
            label="Email"
            variant="outlined"
            size="small"
            inputProps={{
              onChange: handleNameChange
            }}
              sx={{
                mb: 2,
                width: "100%",
                maxWidth: "300px",
                
                '& label.Mui-focused': {
                  color: '#A0AAB4',
                },
                '& label': {
                  color: '#A0AAB4',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#B2BAC2',
                },
                '& .MuiOutlinedInput-root': {
                  color: "white",
                  '& fieldset': {
                    borderColor: '#E0E3E7',
                  },
                  '&:hover fieldset': {
                    borderColor: '#B2BAC2',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6F7E8C',
                  },
                 
                },
              }}
            />
      
        <Button variant="contained" size="small" sx={{
          my: 2,
          py: "12px",
          px: "24px",
          borderRadius: 4,
          bgcolor: "white",
          color: "#121212", 
          
          }}>Join Inkspiffers</Button>
 
      
    </Box>
  )
}

export default BottomActionCall