import React, {useContext, useState, ChangeEvent, useEffect} from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { ThemeContext } from '@/context/ThemeContext';
import Input from "@mui/material/Input"
import GithubUsername from './GithubUsername';


const GithubPopup = () => {
    const dispatch = useDispatch()
    const { data: session } = useSession();
    const router = useRouter()
    const app = useSelector((state: RootState) => state.app)
    const { toggleTheme, theme} = useContext(ThemeContext);

    const {markdown} = app

    const [repo, setRepo] = useState("")
    const [fetchingRepo, setFetchingRepo] = useState(false)

    const [repoInput, setRepoInput] = useState("")
    const [updating, setUpdating] = useState(false)

    const {palette, } = theme
    const {mode } = palette

    const { markdown: {content, title}, viewSettings, markdownSelected } = app

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
    </>
  )
}

export default GithubPopup