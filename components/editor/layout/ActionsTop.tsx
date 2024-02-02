import React, {useEffect, useState} from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Popover from '@mui/material/Popover';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from '@/store/app-slice';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import Settings from '@/components/settings/Settings';
import Paper from "@mui/material/Paper"
import Updates from "@/components/updates/Updates"

export default function ActionsTop() {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch()
const app = useSelector((state: RootState) => state.app)

const {viewSettings} = app

 
  const [updatesAnchorEl, setUpdatesAnchorEl] = React.useState<null | HTMLElement>(null);

  const openUpdates = Boolean(updatesAnchorEl)


  const handleCreateNew = () => {
    if (session) {
      router.push("/create-new")
    }
    else {
      dispatch(appActions.toggleOpenLoginModal())
    }
  }

  const handleOpenSettings = () => {
    dispatch(appActions.setPopup("settings"))
  }

  const handleCloseSettings = () => {
    dispatch(appActions.setPopup(""))
  }

  const handleToggleShowUpdates = (event: React.MouseEvent<HTMLElement>) => {
    setUpdatesAnchorEl(updatesAnchorEl ? null : event.currentTarget);
  };


  return (
  
      
      
      <Box
     sx={{
      // border: "1px solid red",
      py: 3,
    }}>
      <List>
      
      <ListItem  disablePadding sx={{
          //  border: "1px solid red",
           p: 0,
           m: 0,
       }}>
        <ListItemButton sx={{
          //  border: "1px solid blue",
           p: "4px",

           m: 0,
           cursor: "pointer",
           borderRadius: "4px",
         }} onClick={handleToggleShowUpdates}>
          <AccessTimeRoundedIcon sx={{
            mx: 1,
            width: 16,
            height: 16,
          
          }}  /> 
          <Typography variant="body2" sx={{
            fontWeight: 500,
            fontSize: "14px",
           }}>Update</Typography>
         </ListItemButton>
         
       </ListItem>
       <Popover id={openUpdates ? 'updates-popover' : undefined} open={openUpdates} anchorEl={updatesAnchorEl}
       onClose={handleToggleShowUpdates}
       anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      >
        <Paper sx={{
          p: 2,
          width: "400px",
          maxWidth: "100%",
          height: "300px",
          overflowY: "auto",
        }}>
          <Updates />
        </Paper>
      </Popover>

       <ListItem  disablePadding sx={{
          //  border: "1px solid red",
           p: 0,
           m: 0,
       }}>
        <ListItemButton sx={{
          //  border: "1px solid blue",
           p: "4px",
           cursor: "pointer",
           borderRadius: "4px",
         }} onClick={handleOpenSettings}>
          <SettingsOutlinedIcon sx={{
            mx: 1,
            width: 16,
            height: 16,
          }} /> 
          
          <Typography variant="body2" sx={{
            fontWeight: 500,
            fontSize: "14px",
           }}>Settings</Typography>
         </ListItemButton>
       </ListItem>
       <Settings />

      <ListItem  disablePadding sx={{
          //  border: "1px solid red",
           p: 0,
           m: 0,
       }}>
        <ListItemButton sx={{
          //  border: "1px solid blue",
           p: "4px",
           cursor: "pointer",
           borderRadius: "4px",
         }} onClick={handleCreateNew}>
          <AddCircleOutlineOutlinedIcon sx={{
            mx: 1,
            width: 16,
            height: 16,
          }} /> 
          
          <Typography variant="body2" sx={{
            fontWeight: 500,
            fontSize: "14px",
           }}>New file</Typography>
         </ListItemButton>
       </ListItem>
      
      </List>
      
    </Box>
      
  );
}

// http://localhost:3000/editor/New-Markdown-KMkTktr2BLriaLIuYVBB