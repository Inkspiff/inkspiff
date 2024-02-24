"use client"

import * as React from "react"
import { signIn } from "next-auth/react"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import {FaGithub} from "react-icons/fa"

interface GoogleLoginButtonProps {

}


export default function GoogleLoginButton({}: GoogleLoginButtonProps) {
 
 const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)

  return (
    
      <Button
        type="button"
        onClick={() => {
          setIsGoogleLoading(true)
          signIn("google")
        }}
        disabled={isGoogleLoading}
        variant="outlined"
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        {isGoogleLoading ? (
          <span>loading spinner</span>
        ) : (
            <Box component="span" sx={{
              display: "inline-block",
              mr: 1,
            }}><FaGithub/></Box>
        )}{" "}
        Sign In with Google
      </Button>
  )
}
