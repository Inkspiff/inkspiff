import React from 'react';
import Link from "next/link"
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from "react-redux";
import { useSession, signIn, signOut } from "next-auth/react";
import ArrowRightRounded from "@mui/icons-material/ArrowRightRounded"


export default function NameEmail() {
  const { data: session } = useSession();

  if (!session) {
    return <Box sx={{
      display: "flex",
      // justifyContent: "space-between",
      alignItems: "center",
      px: "4px",
    }}> 

      <Avatar alt="Remy Sharp" 
          sx={{
             bgcolor: "#f6f5f4",
             width: 20,
             height: 20,
             margin: 0,
             cursor: "pointer",
             borderRadius: "50%",
              
        // border: "1px solid red",
              mx: 1,
              mb: "8px",
          }} >
            
            </Avatar>
    <Link href="/login" >
     
      <Typography variant="body2" sx={{
        display: "inline-flex",
        alignItems: "center",
        lineHeight: "auto",
        m: 0,
        // border: "1px solid red",
        "&:hover": {
          textDecoration: 'underline'
        }
      }}>  <ArrowRightRounded /> Login</Typography>
      
      </Link>
    </Box>
  }

  return (
    
    
    <Box sx={{
        display: "flex",
        // justifyContent: "space-between",
        alignItems: "center",
        px: "4px",
        mb: 1,
        // border: "1px solid blue",
      }}>
        
        <Avatar alt="Remy Sharp" src={session ? session.user.image! : "https://picsum.photos/id/237/200/300.jpg" } 
          sx={{
             bgcolor: "#f6f5f4",
             width: 20,
             height: 20,
             margin: 0,
             cursor: "pointer",
             borderRadius: "50%",
            
              mx: 1,
          }} >
            R
            </Avatar>
     
        
        {session && <Box sx={{
          // border: "1px solid red",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",

        }}>

            <Typography sx={{
              // border: "1px solid red",
              fontWeight: 700,
              fontSize: "14px",
              p: 0,
              m: 0,
            }}>{session.user.name!}</Typography>
            <Typography sx={{
              // border: "1px solid red",
              m: 0,
              p: 0,
              fontSize: "11px",
            }} variant="caption">{session.user.email!}</Typography>
        </Box>}
     
    </Box>
      
  );
}

// http://localhost:3000/editor/New-Markdown-KMkTktr2BLriaLIuYVBB