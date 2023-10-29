import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded"
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded"
import Logo from "@/components/ui/Logo"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import Link from 'next/link';


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


export default function NavDrawer() {
  const [state, setState] = React.useState(false);

  const toggleDrawer =
    ( open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState(open);
    };

  const navDrawerContent = () => (
    <Box
      sx={{ 
        width: "100%",
     }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2, 
            py: 2
        }}>
            <Logo type="both" />


            <IconButton onClick={toggleDrawer(false)}>
            <CloseRoundedIcon  />
            </IconButton>
            
        </Box>

        <Divider />



      <List sx={{
      p: 1
      }}>
        {NAV_ITEMS.map((item, index) => {
          return <ListItem key={index}  sx={{
            
            textTransform: "capitalize",
            // "&:hover": {
            //   bgcolor: "action.hover"
            // }
          }}>
            <Link href={item.link} style={{
              display: "inline-block",
              width: "100%"
            }}>
            <ListItemButton sx={{
              p: 1.5,
              px: 2,
              borderRadius: "8px",
            }}>
            {item.title}
            </ListItemButton>
            </Link>
            
          </ListItem>
        })}
        
      </List>
    </Box>
  );

  return (
        <React.Fragment>
          
          <IconButton onClick={toggleDrawer(true)} sx={{
            display: {xs: "inline-flex", md: "none" }
          }}>
            <MenuRoundedIcon />
          </IconButton>
          <Drawer
            anchor={'top'}
            open={state}
            onClose={toggleDrawer(false)}

            sx={{
                "& .Mui-paper": {
                    width: "100vw",
                    border: "1px solid red"
                }
            }}
          >
            {navDrawerContent()}
          </Drawer>
        </React.Fragment>

  );
}
