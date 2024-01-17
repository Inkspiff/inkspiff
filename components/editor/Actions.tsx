import React, {useEffect, useState, MouseEvent} from 'react';
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
import TemplatesPopup from "@/components/templates/TemplatesPopup"
import Logo from '../ui/Logo';
import ImportPopup from './ImportPopup';
import ExportPopup from './ExportPopup';


export default function Actions() {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)

  const [exportPopupAnchorEl, setExportPopupAnchorEl] = useState<null | HTMLElement>(null);
  const [importPopupAnchorEl, setImportPopupAnchorEl] = useState<null | HTMLElement>(null);
  const [templatesPopupAnchorEl, setTemplatesPopupAnchorEl] = useState<null | HTMLElement>(null)

  const openImport = Boolean(importPopupAnchorEl);
  const openExport = Boolean(exportPopupAnchorEl)
  const openTemplates = Boolean(templatesPopupAnchorEl)


  const handleOpenImportPopup = (e: React.MouseEvent<HTMLElement>) => {
  if (session) {
      setImportPopupAnchorEl(e.currentTarget as HTMLElement)
    } else {
    dispatch(appActions.toggleOpenLoginModal())
    }
  }


  const handleOpenExportPopup = (e: React.MouseEvent<HTMLElement>) => {
    if (session) {
        setExportPopupAnchorEl(e.currentTarget as HTMLElement)
      } else {
      dispatch(appActions.toggleOpenLoginModal())
      }
    }
  

  const handleGiveFeedback = () => {
    console.log("Give Feedback")
    }


  const handleOpenTemplatesPopup = (e: MouseEvent<HTMLElement>) => {
     if (session) {
      setTemplatesPopupAnchorEl(e.currentTarget as HTMLElement)
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

        <TemplatesPopup open={openTemplates} onClose={() => setTemplatesPopupAnchorEl(null)} />

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

        <ImportPopup open={openImport} onClose={() => setImportPopupAnchorEl(null)} />

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

        <ExportPopup open={openExport} onClose={() => setExportPopupAnchorEl(null)} />

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