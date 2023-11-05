import React, {useState} from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Share from '../share'

const Hero = () => {
  const [name, setName] = useState("")
  const [nameHelperText, setNameHelperText] = useState("")
  const [nameHasError, setNameHasError] = useState(false)
  const [email, setEmail] = useState("")
  const [emailHasError, setEmailHasError] = useState(false)
  const [emailHelperText, setEmailHelperText] = useState("")
  const [alreadyJoined, setAlreadyJoined] = useState(false)

  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)
  const [joinNumber, setJoinNumber] = useState<number>(0)


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

    // const {count} = await response.json()

    setAdded(true)
    // setJoinNumber(count)

    setName("")
    setEmail("")
    
    
    
  }




  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      // justifyContent: "center",
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
          // minHeight: "60vh",
      }}>
          <Typography variant="h1" sx={{
              // fontWeight: 500,
              mb: 4,
              mt: 4
          }}>
          
          There's a better way document your code!
          </Typography>

          <Typography variant="body1" sx={{
              mb: 4,
              mt: 4,
              fontSize: {xs: "18px", sm: "22px"}
          }}>
          
           Join the waitlist! Create code  documentation in seconds, collaborate with fellow developers, get your projects out there.
          </Typography>

          {!added ? 
          <Box sx={{
            display: {xs: "flex"},
            flexDirection: "column",
            alignItems: "center"
          }}>


            <TextField id="name" 
            label="Name"
            variant="outlined"
            disabled={loading}
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
              }}
            />
            <TextField id="email" 
            label="Email"
            variant="outlined"
            disabled={loading}
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
              }}
            />

              <Button variant="contained" onClick={handleJoin} sx={{
                  my: 2,
                  mb:4,
                  py: "12px",
                  px: "24px",
                  borderRadius: 4,
                  fontWeight: 500
              }} size="small">Get early access</Button>
          </Box>
          : 
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

            <Share />
          </Box>}
          

       </Box>


       <Box>
        <Typography variant="body1" sx={{
            
            // textAlign: "center",
            // fontWeight: 500,
            fontSize: {xs: "18px", sm: "24px"},
            lineHeight: "2rem",
            maxWidth: {sm: "450px"},
            mx: "auto"
        }} >
            Are you tired of having to spend hours crafting docs for your code projects? <br />Do you wish there was a smarter, more efficient way to create <span style={{
              fontWeight: "bold",
              display: "inline",
            }}>readme</span> files, collaborate and get your work out? <br />Look no further—Inkspiff is here to revolutionize your code documentation workflow.
        </Typography>
      
       </Box>
     
      
      </Box>
  )
}

export default Hero