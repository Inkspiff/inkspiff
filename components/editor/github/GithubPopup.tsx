import React, {useContext, useState, ChangeEvent, useEffect} from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { ThemeContext } from '@/context/ThemeContext';
import { popupBaseStyle } from '@/config/editor';
import { set } from 'react-hook-form';
import Preview from '../layout/Preview';
import Input from "@mui/material/Input"
import GithubUsername from './GithubUsername';


const GithubPopup = () => {
    const dispatch = useDispatch()
    const { data: session } = useSession();
    const router = useRouter()
    const app = useSelector((state: RootState) => state.app)
    const { toggleTheme, theme} = useContext(ThemeContext);

    const {markdown} = app
    const [ghRepos, setGhRepos] = useState("");

    const [repo, setRepo] = useState("")
    const [fetchingRepo, setFetchingRepo] = useState(false)

    const [repoInput, setRepoInput] = useState("")
    const [updating, setUpdating] = useState(false)

    const {palette, } = theme
    const {mode } = palette

    const { markdown: {content, title}, viewSettings, markdownSelected } = app

    const open = viewSettings.popup === "github"

    const handleClose = () => {
        dispatch(appActions.setPopup(""))
    };

  const handleRepoInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRepoInput(event.target.value)
  }
  
  const handleUpdateRepo = async () => {
    setUpdating(true)
    const response = await fetch("/api/db/update-repo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session!.user.id,
        mdId: markdown.id,
        repo: repoInput
      })
    })

    setUpdating(false)
        
    if (!response?.ok) {
      if (response.status === 402) {
        // set updating as failed
        return 
      }
      return 
    }
}

  const fetchRepos = async () => {
    if (session!.user.githubUsername && session!.user.ghInstallationId) {
      const data = {
        username: session!.user.githubUsername,
        installationId: session!.user.ghInstallationId,
      };
      console.log(data);

      const response = await fetch(
        "http://localhost:3000/api/github/fetch-repos",
        {
          body: JSON.stringify(data),
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setGhRepos(await response.json());
      console.log("Github Repos", ghRepos);
    }
  };

useEffect(() => {

  const getRepo = async () => {
    setFetchingRepo(true)
    const response = await fetch("/api/db/get-repo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mdID: markdown.id,
      })
    })

    setFetchingRepo(false)

    

    if (!response?.ok) {
      if (response.status === 402) {
        return 
      }
      return
    }

    const repo = await response.json()
    setRepo(repo.github)
  }

  if (session && markdownSelected) {
    getRepo()
  }
}, [updating, open])

  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Paper sx={{
            ...popupBaseStyle,
        }}>
          

          

     <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        p: 2,
      
      }}>
        <Button href={`https://github.com/apps/inkspiff-github-agent/installations/new?state=${session!.user.id}`}>Connect GitHub</Button>
        <Button onClick={fetchRepos}>Fetch GH Repos</Button>
        <div>
          {ghRepos}
        </div>

        <GithubUsername />
        {fetchingRepo ? <Typography variant="body1" sx={{
          fontWeight: 700,
          mb: 1,
        }}>Fetching</Typography> :  <Typography variant="body1" sx={{
          fontWeight: 700,
          mb: 1,
        }}>{repo || "None Found"}</Typography>}

        <Typography variant="h2" component="h3" sx={{
          fontWeight: 700,
          mb: 1,
        }}>Select Repo</Typography>
        
        <Input
        onChange={handleRepoInputChange}
        />

        <Button onClick={handleUpdateRepo}>Update</Button>

        {updating && <Typography variant="caption">Updating...</Typography>}
      </Box>

      
        </Paper>
      </Modal>
    </>
  )
}

export default GithubPopup