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
import ViewTemplates from './ViewTemplate';

interface propTypes {
  onViewTemp: (index: number) => void
}

const Templates = ({onViewTemp}: propTypes) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const app = useSelector((state: RootState) => state.app)
  const [loading, setLoading] = useState(false)
  const {templates} = app
  
  
  const handleViewTemplate = (index: number) => {
    onViewTemp(index)
  }

 


  useEffect(() => {
    const getTemplates = async () => {
      setLoading(true)

      const response = await fetch("/api/db/get-templates", {
        method: "GET"
      })
  
      setLoading(false)

      if (!response?.ok) {
        // handle wahalas
      } 
  
      const temps = await response.json()
      
      dispatch(appActions.updateTemplates(temps))
    }


    
    getTemplates()
  }, [])


  return (
    
       <>
        
        {templates.map((template, index) => {
        return <Paper key={index} onClick={() => {handleViewTemplate(index)}}sx={{
            p: 2,
            display: "inline-flex",
            flexDirection: "column",
            width: "50%",
            cursor: "pointer",
            borderRadius: "8px",
        }}>
        <Box sx={{
            height: {xs: "100px"},
            width: "100%",
            bgcolor: "#d2d2d2",
            borderRadius: "8px",
            mb: 1,
            "& img": {
            objectFit: "contain"
            }
        }}>
            {/* <Image src={template.image} alt={template.title} fill /> */}
        </Box>
            <Typography variant="h6" component="h4">{template.name}</Typography>
            <Typography variant="body2" component="p">{template.description}</Typography>
            <Typography variant="body2" sx={{
            alignSelf: "flex-end"
            }}>{template.views}</Typography>
        </Paper>
        })}
        </>
                  
  )
}

export default Templates

