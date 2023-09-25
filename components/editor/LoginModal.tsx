import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface propTypes {
    text?: string,
    subText?: string,
}

export default function LoginModal({text, subText}: propTypes) {

    const handleLogin = () => {
        console.log("login")
    }

  return (
      
        <Box sx={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
        }}>
            <Box sx={{
                position: "relative",
                width: "80px",
                height: "80px",
                border: "1px solid",
                borderColor: "primary.main",
                mb: 2,
            }}>

            </Box>
            <Typography variant="body1" component="h4" sx={{
                fontSize: "28px",
                fontWeight: 700,
                mb: 2,
            }}>{!!text ? text : "Login to Unlock features"}</Typography>
             <Typography variant="body1" sx={{
                
                mb: 2,
            }}>{!!subText ? subText : "Go to login page"}</Typography>
            <Button onClick={handleLogin}>Login</Button>
        </Box>
  );
}