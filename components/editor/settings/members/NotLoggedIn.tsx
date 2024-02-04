import React from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import Link from "next/link"


const NotLoggedIn = () => {
  return (
    <Box sx={{
        height: "100%",
        
      }}>
           <Typography variant="body1" component="h2" sx={{
            fontWeight: 700,
            mb: 2,
          }}>Members</Typography>
          <Divider sx={{
            my: 2
          }}/>
  
          <Box sx={{
            
            // display: "flex",
            // flexDirection: "column",
            // alignItems: "center",
            // justifyContent: "center",
          }}>
             <Typography variant="body2" component="h4" sx={{   
              mb: 1      
              }}>Login to use members feature for free</Typography>
              <Typography variant="body2" sx={{
                fontSize: "12px",
                mb: "4px"
              }}>Invite and manage members for each file you create, collaborate with others to update and maintain your work</Typography>
           
           <Box sx={{
            "& a:hover": {
              textDecoration: "underline"
            }
           }}>  
            <Link href="/login">Login</Link>
           </Box>
          </Box>
  
      </Box>
  )
}

export default NotLoggedIn