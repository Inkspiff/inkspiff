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

const TemplateSlide = ({template}: propTypes) => {

    const  {name, content, description, creator, type, categories} = template
    // const handleBack = () => {
    //     onBack()
    // }

    return <Box>
        
        <Box sx={{
            mb: 4,
            "&hover": {
                color: "info.main"
            }
        }}>

        <Link href={"/templates"} style={{
            display: "flex",
        }}>
            <ArrowLeftRoundedIcon />
            <Typography variant="body1">Template Gallery</Typography>
        </Link>
            
        </Box>

        <Grid container spacing={2} sx={{
            height: "100%",
        }}>
            <Grid item xs={12} md={8} sx={{
                height: "100%",
            }}>
                <Box sx={{
                mb: 2,
                height: "100%",
                }}>
                    <Paper elevation={4} sx={{
                        borderRadius: "6px",
                        overflow: "hidden",
                        height: "100%",
                    }}>
                    
                        <Preview doc={content} />
                    </Paper>
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography variant="h3" sx={{
                    mb: 2,
                }}>{name}</Typography> 
                <Typography variant="body1" sx={{
                    mb: 2
                }}>{type}</Typography>

                <Button variant="contained" sx={{
                    width: "100%",
                    mb: 2
                }}>Use Template</Button>
                <Divider />
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    my: 2,
                }}>
                    <Paper elevation={0} sx={{
                        position: "relative",
                        borderRadius: "50%",
                        width: "45px",
                        height: "45px",
                        overflow: "hidden",
                        p: 1,
                        mr: 2,
                    }}
                    variant="outlined"
                    >
                        <Image src={"/img/logo-black.png"} alt={creator.name} fill sizes={`(max-width: 2000px) 45px`} />
                    </Paper>
                    <Typography>{creator.name}</Typography>
                </Box>
                <Typography variant="body1" sx={{
                    mb: 2
                }}>{description}</Typography>
                <Box sx={{
                    my: 1
                }}>
                    <Typography variant="body2" sx={{
                        textTransform: "uppercase",
                        mb: 1
                    }}>categories</Typography>
                    {categories.map((item, index) => {
                        return <Paper key={index} variant="outlined" elevation={0} sx={{
                            borderRadius: "6px",
                            px: 2,
                            py: 1,
                            width: "auto",
                        }}>
                            <Typography variant="body2" sx={{
                                fontWeight: 500,
                                width: "auto",
                            }}>{item}</Typography>
                        </Paper>
                    })}
                </Box>

                <Box
            sx={{
              display: "flex",
              
            }}
          >
           {SOCIALS.map((item, index) => {
            return <Link key={index} href="https://github.com/preciousnwaoha" target="_blank" style={{
                marginRight: "8px"
            }}>
            <IconButton  size={"small"} sx={{
                "&:hover": {
                    color: "info.main"
                }
            }} > 
                {item.icon}
            </IconButton>
            </Link>
           })}
          </Box>
            </Grid>
        </Grid>
        
    </Box>
}

export default TemplateSlide