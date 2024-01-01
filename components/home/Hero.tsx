import React, {useState} from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

const Hero = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const [added, setAdded] = useState(false)


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleJoin = async () => {
    
    // console.log({dataToSend})


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
      return
    } 

    setAdded(true)

    const json = await response.json()

    console.log({json})
    
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
          
          There's a better way to document your code!
          </Typography>

          <Typography variant="body1" sx={{
              mb: 4,
              mt: 4,
              fontSize: {xs: "18px"}
          }}>
          
           Join the waitlist! Create code documentation in seconds, collaborate with fellow developers, grow your work.
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
            height: "150px",
            margin: "0 auto",
            mb: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Typography variant="h4" component="p">All Done, Thanks.</Typography>
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
            Are you tired of spending hours crafting documentation for your code projects? Do you wish there was a smarter, more efficient way to generate readme files and collaborate with your team on code documentation? Look no further—Inkspiff is here to revolutionize your code documentation workflow.
        </Typography>
      
       </Box>
     
      
      </Box>
  )
}

export default Hero