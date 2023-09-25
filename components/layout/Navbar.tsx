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
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import {navConfig} from "@/config/site"

const Navbar = () => {
    const [clickedItemSubItems, setClickedItemSubItems] = React.useState<{name: string; link: string; description: string}[] | undefined>(undefined)
    const [clickedItemIndex, setClickedItemIndex] = React.useState<number | undefined>(undefined)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (index: number) => {
        setClickedItemIndex(index)
        setClickedItemSubItems(navConfig[index].subItems)
    };
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
            {navConfig.map((item, index) => {
                return <ListItem key={index} sx={{
                    // border: "1px solid blue"
                    mr: 1,
                }}>
                    <ListItemButton sx={{
                        textTransform: "capitalize",
                        py: 0,
                        bgcolor: (clickedItemIndex === index) ? "action.hover" : ""
                    }}
                    id={`nav-item-button-${index}`}
                    aria-controls={open ? 'nav-item-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                        
                        if (item.subItems) {
                            setAnchorEl(event.currentTarget)
                            handleClick(index)
                        }
                       
                        
                    }}
                    >
                        
                        <ListItemText primary={<Typography sx={{
                            // border: "1px solid red"
                        }}>
                            {item.subItems ? item.name : <Link href={item.link}>{item.name}</Link> }
                            
                        </Typography>} />

                        {(item.subItems) && <>
                            { (clickedItemIndex === index) ?<KeyboardArrowDownRoundedIcon  sx={{
                            // border: "1px solid red",
                            fontSize: "18px"
                        }} />: <KeyboardArrowUpRoundedIcon  sx={{
                            // border: "1px solid red",
                            fontSize: "18px"
                        }} />}
                        </>}
                       
                    </ListItemButton>
                    
                </ListItem>
            })}
        </List>
        <Menu
        id="nav-item-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'nav-item-button',
        }}
       sx={{
        "& .MuiMenu-paper": {
            width: "240px",
            maxWidth: "100%",
            p: 0,
            py: 1,

        }
       }}
      >
        
            {clickedItemSubItems?.map((item, index) => {
            return <MenuItem key={index} onClick={handleClose} sx={{
                p: "4px 8px"
            }}>
                {/* <ListItemButton> */}
                <Link href={item.link}>
                <ListItemText primary={<Box sx={{
                        // border: "1px solid red"
                    }}>
                        <Typography variant="body1" sx={{
                            textTransform: "capitalize"
                        }}>{item.name}</Typography>
                        <Typography variant="body2">{item.description}</Typography>
                    </Box>} />
                </Link>
                    
                {/* </ListItemButton> */}
                
                </MenuItem>
        })}
        
        
      </Menu>
    </Box>
}

export default Navbar;