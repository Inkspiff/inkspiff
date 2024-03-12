import React, {useContext, useState, ChangeEvent, useEffect} from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { ThemeContext } from '@/context/ThemeContext';
import Input from "@mui/material/Input"
import GithubUsername from './GithubUsername';


const AddGithubRepo = () => {
    const { data: session } = useSession();
    const router = useRouter()
    const app = useSelector((state: RootState) => state.app)

    const {markdown} = app

    const [repoInput, setRepoInput] = useState("")
    const [updating, setUpdating] = useState(false)

    const { markdown: {automation}, viewSettings, markdownSelected } = app

    if (!automation) {
        return <Typography variant="body1" sx={{
            fontWeight: 700,
            mb: 1,
        }}>No Automation Found</Typography>
    }



    const {repo} = automation


  return (   

     <>

        <Typography variant="h2" component="h3" sx={{
          fontWeight: 700,
          mb: 1,
        }}>Select Repo</Typography>

        <Box>
        {/* List of Repos */}
        </Box>
        
    </>
  )
}

export default AddGithubRepo