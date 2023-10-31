import React, {useContext} from 'react'
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { ThemeContext } from '@/context/ThemeContext';
import GoogleIcon from "@mui/icons-material/Google"

import { SxProps } from "@mui/material";

interface propTypes {
    size?: number,
    sx?: SxProps,
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

const Socials = ({size=34, sx={}}: propTypes) => {
    const { theme } = useContext(ThemeContext);

    const {palette} = theme

    const {mode} = palette


  return (
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
  )
}

export default Socials