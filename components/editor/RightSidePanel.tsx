import React, {useEffect, useState} from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Link from "next/link"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import MailIcon from '@mui/icons-material/Mail';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "@mui/material/Button"
import { useRouter } from "next/router"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import FileList from "@/components/editor/FileList"
import AccountArea from '@/components/editor/AccountArea';
import Actions from '@/components/editor/Actions';

const drawerWidth = 240;



interface propTypes {
  open: boolean, 
  // onClose: () => void,
  // onCreateNew: () => void,
  // onHideCreateNew: () =>void,
}


export default function RightSidePanel({open}: propTypes) {
  const theme = useTheme();
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)
  
  



  return (
    <Drawer
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        bgcolor: "gray.A100",
        boxSizing: 'border-box',
        height: "100vh",
        overflowY: "hidden",
        // border: "1px solid red"
      },
    }}
    variant="persistent"
    anchor="left"
    open={open}
  >
    <AccountArea />
    
    
    <Box sx={{
      overflowY: "auto",
      maxHeight: "calc(100vh - 150px)",
      pb: 3,
    }}>
      <FileList />

      <Actions />
    </Box>
    
    
  </Drawer>
  );
}

// http://localhost:3000/editor/New-Markdown-KMkTktr2BLriaLIuYVBB