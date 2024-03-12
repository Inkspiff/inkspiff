import React, {useState, useEffect, useContext} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { ThemeContext } from "@/context/ThemeContext";
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

const Repos = () => {
    const dispatch = useDispatch();
  const { data: session } = useSession();
//   const app = useSelector((state: RootState) => state.app);

  const [ghRepos, setGhRepos] = useState("");

  const fetchRepos = async () => {
    if (session!.user.githubUsername && session!.user.ghInstallationId) {
      const data = {
        username: session!.user.githubUsername,
        installationId: session!.user.ghInstallationId,
      };
      console.log(data);

      const response = await fetch("/api/github/fetch-repos", {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setGhRepos(await response.json());
      console.log("Github Repos", ghRepos);
    }
  };


  return (
    <Box>
        Repos

        <Button onClick={fetchRepos}>Fetch GH Repos</Button>

        <Box>{ghRepos}</Box>
    </Box>
  )
}

export default Repos