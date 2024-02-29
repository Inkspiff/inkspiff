import React from 'react'
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { UserAuthForm } from "@/components/auth/user-auth-form";

const Login = () => {
  return (
    <>
    <Box>
      
    <Typography variant="h1" sx={{
      mb: "16px",
      maxWidth: "540px",

    }}>Login to your account </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 1,
        }}
      >
        Use Github to sign in to your account
      </Typography>
    </Box>

    <UserAuthForm />

    <Typography
      variant="body1"
      sx={{
        "& a": {
          color: "#121212",
        },
       
      }}
    >
      <Link href="/register">
        Don&apos;t have an account? <Box component="span" sx={{
         "&:hover": {
          textDecoration: "underline",
        },
        }}>Sign Up</Box>
      </Link>
    </Typography>
  </>
  )
}

export default Login