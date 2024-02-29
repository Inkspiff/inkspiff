"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { FaGithub } from "react-icons/fa";

interface GithubLoginButtonProps {}

export default function GithubLoginButton({}: GithubLoginButtonProps) {
  
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);

  const handleLogin = async () => { 
    setIsGitHubLoading(true);
    await signIn("github");
  }

  return (
    <Button
      type="button"
      onClick={handleLogin}
      disabled={isGitHubLoading}
      variant="outlined"
      sx={{
        my: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      {isGitHubLoading ? (
        <span>loading spinner</span>
      ) : (
        <Box
          component="span"
          sx={{
            display: "inline-block",
            mr: 1,
          }}
        >
          <FaGithub />
        </Box>
      )}{" "}
      Sign In with Github
    </Button>
  );
}
