import React, {useContext, useState} from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { ThemeContext } from '@/context/ThemeContext';
import Share from '../share'

const BottomActionCall = () => {
  const [name, setName] = useState("")
  const [nameHelperText, setNameHelperText] = useState("")
  const [nameHasError, setNameHasError] = useState(false)
  const [email, setEmail] = useState("")
  const [emailHasError, setEmailHasError] = useState(false)
  const [emailHelperText, setEmailHelperText] = useState("")
  const [alreadyJoined, setAlreadyJoined] = useState(false)

  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    setNameHasError(false)
    setNameHelperText("")
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setEmailHasError(false)
    setEmailHelperText("")
  }

  const handleJoin = async () => {
    

    // console.log({dataToSend})
    let fromHasError = false

    if (name.trim() === "") {
      setNameHasError(true)
      setNameHelperText("Please add your full name.")
      fromHasError = true
    }

    if (email.trim() === "") {
      setEmailHasError(true)
      setEmailHelperText("Please add your email.")
      fromHasError = true
    }

    const emailRegex =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    if (!emailRegex.test(String(email)
    .toLowerCase())) {
      setEmailHasError(true)
      setEmailHelperText("Please add a valid email.")
      fromHasError = true
    }

    if (fromHasError) {
      return
    }

  

    setLoading(true)

    const responseGetEmails = await fetch("/api/db/get-emails", {
      headers: {
        "Content-Type": "application/json",
      },
      
      method: "GET",
    })

    if (!responseGetEmails?.ok) {
      // handle wahalas
      return
    } 

    const emails = await responseGetEmails.json()

    if (emails.includes(email)) {
      // user already joined
      setAlreadyJoined(true)
      setLoading(false)
      setAdded(true)
      setName("")
      setEmail("")
    }

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
      return
    } 

    setAdded(true)

    setName("")
    setEmail("")
    
    
    
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

      {!added? <Box sx={{
        // border: 1,
        // display: "flex",
        // flexDirection: "column",

      }}>
        <TextField id="name" 
            label="Name"
            variant="outlined"
            error={nameHasError}
            helperText={nameHelperText}
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
            error={emailHasError}
            helperText={emailHelperText}
            size="small"
            inputProps={{
              onChange: handleEmailChange
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
      <Box>
      <Button variant="contained" onClick={handleJoin}  size="small" sx={{
          my: 2,
          py: "12px",
          px: "24px",
          borderRadius: 4,
          bgcolor: "white",
          color: "#121212", 
          "&:hover": {
            bgcolor: "#f0f0f0",
          }
          
          }}>Get early access</Button>
      </Box >
        
      </Box> :
       <Box sx={{
        border: "2px dashed #121212",
        borderRadius: "16px",
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        mb: 4,
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Typography variant="h4" component="p" sx={{
          mb: 2
        }}>{alreadyJoined ? "You are already on the list" : "All Done, Thanks."}</Typography>

        <Share mode="dark"/>
      </Box>}
      
      
      
 
      
    </Box>
  )
}

export default BottomActionCall