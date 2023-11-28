import React, {useEffect, useState} from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from '@/store/app-slice';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import Settings from '@/components/settings/Settings';
import Paper from "@mui/material/Paper"
import Divider from "@mui/material/Divider"
import Updates from "@/components/updates/Updates"
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import NameEmail from '@/components/account/NameEmail';
import EditorModal from '@/components/editor/EditorModal';
import LoginModal from '@/components/auth/login-modal';

export default function AccountAreaMobile() {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)

  const [openSettings, setOpenSettings] = useState(false)
  const [showUpdates, setShowUpdates] = React.useState(false);
  const [logoutAnchorEl, setLogoutAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleToggleOpenLogout = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setLogoutAnchorEl(logoutAnchorEl ? null : event.currentTarget);
  };

  const openLogout = Boolean(logoutAnchorEl);


  const handleDrawerClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    dispatch(appActions.closeDrawer())
  };

  const handleCreateNew = () => {
    dispatch(appActions.closeDrawer())
    if (session) {
      router.push("/create-new")
    }
    else {

      dispatch(appActions.toggleOpenLoginModal())
    }
  }

  const handleOpenSettings = () => {
    dispatch(appActions.closeDrawer())
    setOpenSettings(true)
  }

  const handleCloseSettings = () => {
    setOpenSettings(false)

  }

  const handleToggleShowUpdates = () => {
    dispatch(appActions.closeDrawer())
    setShowUpdates(prev => !prev);
  };

  const handleLogout = () => {
    signOut()
    router.push("/")
  }


  return (
    
    <Box sx={{
      // border: "1px solid green",
      display: {xs: "block", sm: "none"},
      height: {sm: "150px"},
    }}>
    <Box sx={{
        height: "45px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: "4px",
        // border: "1px solid red",
        "&:hover": {
          bgcolor: "grey.A200"
        },
        "&:hover .expand-icon": {
          opacity: 1
        }
      }} onClick={handleToggleOpenLogout}>
        <Box sx={{
        display: "flex",
        justifyContent: "space-between",
  // border: "1px solid red",
          
          alignItems: "center",
          cursor: "pointer",
          
      }}>
        <Avatar alt="Remy Sharp" src={session ? session.user.image! : "" } 
          sx={{
             bgcolor: "#f6f5f4",
             width: 24,
             height: 24,
             margin: 0,
             cursor: "pointer",
             borderRadius: "4px",
       
              mx: 1,
          }} >
            
            </Avatar>
            {session ? <Typography sx={{
              // border: "1px solid red",
              p: 0
            }}>{session.user.name!}</Typography> : <Typography sx={{
              // border: "1px solid red",
              p: 0
            }}>Not logged in</Typography>}
            <UnfoldMoreRoundedIcon className="expand-icon" sx={{
              fontSize: "18px",
              opacity: 0,
              ml: 1,
            }} />
        </Box>
     
        <Box>
          <IconButton size={"small"} sx={{
            p: "2px",
            borderRadius: "4px"
          }} onClick={handleDrawerClose}>
            <KeyboardDoubleArrowLeftRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      
      <Popover 
      id={openLogout ? 'logout-popover' : undefined} 
      open={openLogout} 
      anchorEl={logoutAnchorEl}
       onClose={handleToggleOpenLogout}
       anchorOrigin={{
         vertical: 'top',
         horizontal: 'left',
       }}
      >
        <Paper sx={{
          borderRadius: "6px",
          width: "240px",
          maxWidth: "100%",
          border: "1px solid red"
        }}>

          <Box sx={{
            py: 1,
            px: 1,
          }}></Box>
          <NameEmail />
          <Divider sx={{
            mt: 1,
          }}/>
          <List sx={{
            py: 1
          }}>
          {session && <ListItem sx={{
              p: 0,
              px: "4px",
            }}>
              <ListItemButton onClick={handleLogout} sx={{
                p: "2px 8px",
                m: 0,
                borderRadius: "4px",
              }}>
                Logout
              </ListItemButton>
            </ListItem>}
          </List>
        </Paper>
      </Popover>

      <Box
     sx={{
      // border: "1px solid red",
      pt: 2,
      pb: 2,
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
       <EditorModal open={showUpdates}
       onClose={handleToggleShowUpdates}
       sx={{
        p: 0
       }}
      >
        <Paper sx={{
          p: 2,
          width: "400px",
          maxWidth: "100%",
          height: "100%",
          overflowY: "auto",
        }}>
          <Updates />
        </Paper>
      </EditorModal>

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
       <Settings open={openSettings} onClose={handleCloseSettings} />

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
    </Box>
      
  );
}

// http://localhost:3000/editor/New-Markdown-KMkTktr2BLriaLIuYVBB