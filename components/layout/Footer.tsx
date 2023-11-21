import React from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import PaddedContainer from "@/components/layout/PaddedContainer"
import Logo from "@/components/ui/Logo"
import Socials from "@/components/ui/Socials"

const FOOTER_DATA =[
    {
        heading: "Product",
        items: [
            {
                link: "/editor",
                text: "Editor"
            },
            {
                link: "/product/ai",
                text: "Inspill AI"
            },
            {
                link: "/templates",
                text: "Templates"
            },
            {
                link: "/releases",
                text: "What's new"
            }
        ]
    },
    {
        heading: "Get Started",
        items: [
            {
                link: "/signup",
                text: "Sign up"
            },
            {
                link: "/login",
                text: "Log up"
            },
        ]
    },
    {
        heading: "Resources",
        items: [
            {
                link: "/pricing",
                text: "Pricing"
            },
            {
                link: "/about-us",
                text: "About us"
            },
            {
                link: "/contact-support",
                text: "Contact Support"
            },
            {
                link: "/terms-and-privacy",
                text: "Terms & policies"
            },
            {
                link: "/blog",
                text: "Blog"
            },
            {
                link: "/community",
                text: "Community"
            },
        ]
    }
]

const DOWN_TEXT_LIST = [
    "We do not sell or share your personal information",
    "Do not share or sell my info"
]

const HomeFooter = () => {

    const downText = Math.floor(Math.random() * DOWN_TEXT_LIST.length)

  return (
    <Box>
        <PaddedContainer >
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Box>
                        <Logo type={"both"}/>
                        <Typography sx={{
                            my: 2
                        }}>Create READMEs in seconds.</Typography>
                        <Socials />
                    </Box>
                </Grid>
                <Grid item container xs={12} md={8}>
                    
                    {FOOTER_DATA.map((data, index) => {
                        return <Grid key={index} item xs={12} sm={4} >
                        <Typography variant="body1" component="h4" sx={{
                            fontWeight: 700,
                            mb: 1,
                        }}>{data.heading}</Typography>

                        <ul style={{
                            paddingLeft: 0,
                            listStyle: "none",
                            margin: 0,
                            
                        }}>
                        {data.items.map((item, index) => {
                            return <li key={index} style={{
                                marginBottom: "8px",
                                cursor: "pointer",
                            }}>
                                <Typography sx={{
                                    display: "inline",
                                    "&:hover": {
                                        textDecoration: "underline",
                                        color: "primary.main",
                                    }
                                }}>{item.text}</Typography>
                            </li>
                        })}
                        </ul>
                        
                    </Grid>

                    })}

                    <Grid item xs={12} md={12}>
                        <Typography>{DOWN_TEXT_LIST[0]}</Typography>
                        <Typography variant="caption">&copy; 2023 Inskpill by <Link href="https://twitter.com/pinqode" sx={{
                             textDecoration: "none",
                             color: "inherit",
                            "&:hover": {
                                textDecoration: "underline",
                                color: "primary.main",
                            }
                        }}>pinqode</Link></Typography>
                    </Grid>
                </Grid>
            </Grid>
        </PaddedContainer>
    </Box>
  )
}

export default HomeFooter