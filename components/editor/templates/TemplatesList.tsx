import React, {useEffect, useState} from "react"
import Link from "next/link"
import Image from "next/image"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Divider from "@mui/material/Divider"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded"
import GoogleIcon from "@mui/icons-material/Google"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useRouter } from 'next/router';
import { TemplateType } from '@/types';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import Preview from "@/components/editor/layout/Preview"
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "@mui/material/Avatar"



interface propTypes {
    // onBack: () => void,
    templates: TemplateType[]
}


const TemplateList = ({templates}: propTypes) => {
    const dispatch = useDispatch()
  const router = useRouter()
  const app = useSelector((state: RootState) => state.app) 
  const [loading, setLoading] = useState(false)
  
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

    if (templates.length === 0) {
      console.log("grabbing templates")
      getTemplates()
    }
  }, [templates])
  

  if (!templates) {
    return <Box>
        No Templates.
    </Box>
  }

    return <Grid container spacing={2}>
       
        {templates.map((template, index) => {
            return <Grid key={index} item xs={12} sm={6} md={6} lg={3}>
                    <Link
                    //  href={`/templates/${template.name.toLowerCase().trim().replace(" ", "-")}`}
                        href={`/templates/${template.id}`}
                     >
                    <Paper elevation={0} variant={"outlined"} sx={{
                        borderRadius: "4px",
                        position: "relative",
                        width: "100%",
                        height: "240px",
                        "& img": {
                            objectFit: "contain"
                        }
                    }}>
                        
                        <Image src={"/img/logo-black.png"} alt={template.name} fill sizes={`(min-width=0) 100%`} priority={true} /> 
                        
                       
                    </Paper>
                    </Link>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1,
                    }}>
                        <Box >
                            <Typography>{template.name}</Typography>
                            <Typography>{template.creator.name}</Typography>
                        </Box>
                    <Avatar src={template.creator.image}  />
                    </Box>
            </Grid>
        })}
        
    </Grid>
}

export default TemplateList