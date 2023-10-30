import React, {useState} from "react"
import Link from "next/link"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"
import ListItemButton from "@mui/material/ListItemButton"
import Box from "@mui/material/Box"
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded"
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {navConfig} from "@/config/site"

const NAV_ITEMS= [
    {
      title: "about",
      link: "/about",
    },
    {
      title: "feedback",
      link: "/about",
    }
  ]
  

const Navbar = () => {
    const [clickedItemSubItems, setClickedItemSubItems] = React.useState<{name: string; link: string; description: string}[] | undefined>(undefined)
    const [clickedItemIndex, setClickedItemIndex] = React.useState<number | undefined>(undefined)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
      setAnchorEl(null);
    };


    return <Box component="nav" sx={{
        mx: 2,
        display: {xs: "none", md: "block"}
    }}>
        <List sx={{
            display: "flex",
            // border: "1px solid red"
        }}>
            {NAV_ITEMS.map((item, index) => {
                return <ListItem key={index} sx={{
                    // border: "1px solid blue"
                    mr: 1,
                }}>
                    <Link href={item.link}>
                    <ListItemButton sx={{
                        textTransform: "capitalize",
                        py: 1,
                        px: 2,
                        bgcolor: (clickedItemIndex === index) ? "action.hover" : ""
                    }}
                    id={`nav-item-button-${index}`}
                    aria-controls={open ? 'nav-item-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    
                    >
                        {item.title}
                        
                       
                    </ListItemButton>
                    </Link>
                   
                    
                </ListItem>
            })}
        </List>
      
    </Box>
}

export default Navbar;