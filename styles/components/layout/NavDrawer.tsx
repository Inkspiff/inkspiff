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
import CancelRoundedIcon from "@mui/icons-material/CancelRounded"



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
            justifyContent: "space-between"
        }}>
            <Logo type="both" />

            <CancelRoundedIcon onClick={toggleDrawer(false)} />
        </Box>

        <Divider />

      <List>

        
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
            anchor={'right'}
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
