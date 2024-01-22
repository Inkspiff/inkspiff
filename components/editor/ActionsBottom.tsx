import React, {useEffect, useState, MouseEvent} from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from '@/store/app-slice';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Divider from "@mui/material/Divider"
import Logo from '../ui/Logo';

export default function ActionsBottom() {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)




  const handleOpenImportPopup = () => {
  if (session) {
      dispatch(appActions.setPopup("import"))
    } else {
    dispatch(appActions.toggleOpenLoginModal())
    }
  }


  const handleOpenExportPopup = () => {
    if (session) {
      dispatch(appActions.setPopup("export"))
      } else {
      dispatch(appActions.toggleOpenLoginModal())
      }
    }
  

  const handleGiveFeedback = () => {
    dispatch(appActions.setPopup("feedback"))
    }


  const handleOpenTemplatesPopup = (e: MouseEvent<HTMLElement>) => {
     if (session) {
      dispatch(appActions.setPopup("templates"))
    } else {
    dispatch(appActions.toggleOpenLoginModal())
    }
  }


  return (
    
      <List sx={{
        display: "flex",
        flexDirection: "column"
      }}>
        <Divider sx={{
          mb: 2
        }} />
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
          }} onClick={handleOpenTemplatesPopup}>
            <SettingsOutlinedIcon sx={{
              mx: 1,
              width: 16,
              height: 16,
            }} /> 
            
            <Typography variant="body2" sx={{
              fontWeight: 500,
              fontSize: "14px",
            }}>Templates</Typography>
          </ListItemButton>
        </ListItem>

        

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
          }} onClick={handleOpenImportPopup}>
            <SettingsOutlinedIcon sx={{
              mx: 1,
              width: 16,
              height: 16,
            }} /> 
            
            <Typography variant="body2" sx={{
              fontWeight: 500,
              fontSize: "14px",
            }}>Import</Typography>
          </ListItemButton>
        </ListItem>

        

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
          }} onClick={handleOpenExportPopup}>
            <AddCircleOutlineOutlinedIcon sx={{
              mx: 1,
              width: 16,
              height: 16,
            }} /> 
            
            <Typography variant="body2" sx={{
              fontWeight: 500,
              fontSize: "14px",
            }}>Export</Typography>
          </ListItemButton>
        </ListItem>

        
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
          }} onClick={handleGiveFeedback}>
            <AddCircleOutlineOutlinedIcon sx={{
              mx: 1,
              width: 16,
              height: 16,
            }} /> 
            
            <Typography variant="body2" sx={{
              fontWeight: 500,
              fontSize: "14px",
            }}>Feedback</Typography>
          </ListItemButton>
        </ListItem>


        <Box sx={{
          py: 1,
          px: 2,
          // alignSelf: "center",
        }}>
            <Logo type="image" sx={{
              transform: "translateX(-8px) translateY(12px)"
            }}/>
            
        </Box>
      </List>
  );
}

// http://localhost:3000/editor/New-Markdown-KMkTktr2BLriaLIuYVBB