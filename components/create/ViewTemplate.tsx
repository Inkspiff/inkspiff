import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import { useRouter } from 'next/router';
import { TemplateType } from '@/types';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import Preview from "@/components/editor/Preview"
import { useSession, signIn, signOut } from "next-auth/react";

interface propTypes {
  title: string,
  content: string,
  onBack: () => void
}

const ViewTemplate = ({title, content, onBack}: propTypes) => {
    const { data: session } = useSession();
  const dispatch = useDispatch()
  const router = useRouter()
  const app = useSelector((state: RootState) => state.app)
  const [loadingSelectedTemp, setLoadingSelectedTemp] = useState(false)
  const {templates} = app
  

  const handleBackToAllTemps = () => {
    onBack()
  }


  const handleCreateNewMarkdown = async () => {
    
    setLoadingSelectedTemp(true)

    const response = await fetch("/api/db/create-md", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        creator: session!.user,
      })

    })

    setLoadingSelectedTemp(false)
    if (!response?.ok) {
      // handle wahalas
    } 

    const json = await response.json()

    router.push(`/editor/${title.trim().split(" ").filter(a => a !== " ").join("-")}-${json.id}`)
    

  }

  return (
    <Box >
        <IconButton onClick={handleBackToAllTemps} >
            <ChevronLeftRoundedIcon />
        </IconButton>
        <Box sx={{
        maxHeight: "calc(100% - 100px)",
        mb: 2
        }}>
            <Preview doc={content} />
        </Box>
        <Box sx={{
        display: "flex",
        flexDirection: "column",
         }}>
            <Button variant="contained" onClick={() => {
                handleCreateNewMarkdown()
            }} sx={{
            alignSelf: "flex-end"
            }}>Use Template</Button>
        </Box>
            
    </Box>
        
                  
  )
}

export default ViewTemplate

