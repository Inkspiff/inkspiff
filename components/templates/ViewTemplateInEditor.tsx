import React, {useEffect, useState} from "react"
import Image from "next/image"
import Link from "next/link"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Divider from "@mui/material/Divider"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded"
import GoogleIcon from "@mui/icons-material/Google"
import { TemplateType, UserType } from "@/types"
import Preview from "@/components/editor/Preview"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
// import { useRouter: altRouter } from "next/router"

interface propTypes {
 template:  TemplateType,
 onClose: () => void,

}



const ViewTemplateInEditor = ({template, onClose}: propTypes) => {
    const dispatch = useDispatch()
    const { data: session } = useSession();
    const router = useRouter()
    const app = useSelector((state: RootState) => state.app)
    const [useTemp, setUseTemp] = useState(false)
    const [showCreating, setShowCreating] = useState(false)

    if (!template) return <Box sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    }}>Not found</Box>

    const  {name, content, description, creator, type, categories} = template
    const {markdown} = app

    const handleUseTemplate = () => {
        setUseTemp(true)
    }

     const handleMerge = () => {
        dispatch(appActions.updateMarkdownContent(
            `${markdown.content}\n\n${content}`
        ))
        // dispatch(appActions.changeMarkdown({
        //     content: `${markdown.content}\n\n${content}`,
        //     currentLine: markdown.content.split("\n").length + content.split("\n").length
        // }))

        setTimeout(() => {
            onClose()
        }, 0)
    }
    const handleCreateNew = async () => {
        
        setShowCreating(true)

        const newMdData = {
          title: name,
          content: content,
          admin: session!.user.id,
        }

    
        const response = await fetch("/api/db/create-md", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMdData)
    
        })
    
        // setShowCreating(false)
        if (!response?.ok) {
          // handle wahalas
        } 
    
        const json = await response.json()
        console.log(json)
    
        router.push({
            pathname: '/editor/[markdown-id]',
            query: {
              'markdown-id' : router.query['markdown-id'],
            },
          }, 
          `/editor/${name.trim().split(" ").filter(a => a !== " ").join("-")}-${json.id}`,
          {
            shallow: true
          })
        
          dispatch(appActions.addFile(
            {
              id: json.id,
              title: name
            }
          ))
          dispatch(appActions.updateMarkdownSelected(json.id))
          onClose()
      }
    
    

    return <Box sx={{
        // border: "1px solid red",
        height: "100%",
        position: "relative"
        
    }}>
                <Box sx={{
                mb: 2,
                maxHeight: "calc(100% - 100px)",
                overflow: "auto",
                }}>
                    <Preview doc={content} />
                </Box>
           
                <Box sx={{

                    // border: "1px solid red",
                    position: "absolute",
                    width: "100%",
                    bottom: "0px",
                    left: "0px",
                }}>
                    <Box sx={{
                        // border: "1px solid red",
                        height: "50px",
                    }}></Box>

                    <Box sx={{
                        px: 2,
                        mb: 2
                    }}>
                        <Paper variant="outlined" sx={{
                        borderRadius: "6px",
                        width: "100%",
                        display: "flex",
                    justifyContent: "space-between",
                    p: 2,
                    }}>
                        {useTemp ? <Grid container spacing={2} sx={{
                        }}>
                            <Grid item md={6}>
                                <Button variant="contained" sx={{
                                    height: "auto",
                                    minHeight: "auto",
                                    width: "100%",
                                }} onClick={handleMerge}>Merge</Button>
                            </Grid>

                            <Grid item md={6}>
                                <Button variant="contained" sx={{
                                    height: "auto",
                                    minHeight: "auto",
                                    width: "100%",
                                }} onClick={handleCreateNew}>New</Button>
                            </Grid>

                        </Grid> : <Grid container spacing={2}>
                            <Grid item sm={12} md={8}>
                            <Box>
                        <Typography variant="body1" sx={{
                            fontWeight: 700,
                            mb: 1,
                        }}>{name}</Typography> 
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 2,
                        }}>
                            <Paper elevation={0} sx={{
                                position: "relative",
                                borderRadius: "50%",
                                width: "30px",
                                height: "30px",
                                overflow: "hidden",
                                p: 1,
                                mr: 2,
                            }}
                            variant="outlined"
                            >
                                <Image src={creator.image || "/img/logo-black.png"} alt={creator.name || "Template Creator"} fill sizes={`(max-width: 2000px) 45px`} />
                            </Paper>
                            <Typography variant="body2" sx={{
                                fontWeight: 700
                            }}>{creator.name}</Typography>
                        </Box>
                        <Typography variant="body2" sx={{
                        }}>{description}</Typography>
                        </Box>
                            </Grid>

                            <Grid item sm={12} md={4}>
                            <Button variant="contained" sx={{
                            height: "auto",
                            minHeight: "auto",
                            width: "100%",
                        }} onClick={handleUseTemplate}>Use Template</Button>
                            </Grid>
                        </Grid>}
                    </Paper>
                    </Box>
                </Box>
        
    </Box>
}

export default ViewTemplateInEditor