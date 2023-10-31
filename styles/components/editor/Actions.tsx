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
import LoginModal from '@/components/editor/LoginModal';
import TemplatesPopup from "@/components/templates/TemplatesPopup"

export default function Actions() {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)

  const [exportAnchorEl, setExportAnchorEl] = React.useState<null | HTMLElement>(null);
  const [importAnchorEl, setImportAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleToggleOpenImport = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setImportAnchorEl(importAnchorEl ? null : event.currentTarget);
  };

  const openImport = Boolean(importAnchorEl);

  const openExport = Boolean(exportAnchorEl)


  const handleExport = () => {
  }

  const handleImport = () => {
  }

  
  const [openTemplatesPopup, setOpenTemplatesPopup] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginModalTexts, setLoginModalTexts] = useState<{text: string, subText: string}>({ text: "", subText: ""})

  const handleToggleShowLoginModal = () => {
    setShowLoginModal(prev => !prev)
  }

  const handleOpenTemplatesPopup = () => {
    setOpenTemplatesPopup(true)
  }

  const handleCloseTemplatesPopup = () => {
    setOpenTemplatesPopup(false)
  }

  return (
    
      <List>
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

        <TemplatesPopup open={openTemplatesPopup} onClose={handleCloseTemplatesPopup} />

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
          }} onClick={handleImport}>
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
          }} onClick={handleExport}>
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
      </List>
  );
}

// http://localhost:3000/editor/New-Markdown-KMkTktr2BLriaLIuYVBB