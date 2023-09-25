import React from "react"
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
import { TemplateType } from "@/types"
import Preview from "@/components/editor/Preview"


interface propTypes {
 template:  TemplateType
}

const SOCIALS = [
    {
        name: "twitter",
        icon: <GoogleIcon />,
        link: "",
    },
    {
        name: "linkedin",
        icon: <GoogleIcon />,
        link: "",
    },
    {
        name: "youtube",
        icon: <GoogleIcon />,
        link: "",
    },
]

const ViewTemplateInEditor = ({template}: propTypes) => {

    const  {name, content, description, creator, type, categories} = template
    // const handleBack = () => {
    //     onBack()
    // }

    return <Box sx={{
        border: "1px solid red",
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
                    
                    border: "1px solid red",
                    position: "absolute",
                    width: "100%",
                    bottom: "0px",
                    left: "0px",
                }}>
                    <Box sx={{
                        border: "1px solid red",
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
                        <Grid container spacing={2}>
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
                                <Image src={"/img/logo-black.png"} alt={creator.name} fill sizes={`(max-width: 2000px) 45px`} />
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
                        }}>Use Template</Button>
                            </Grid>
                        </Grid>
                       

                        
                    </Paper>
                    </Box>
                    
                    
                </Box>
        
    </Box>
}

export default ViewTemplateInEditor