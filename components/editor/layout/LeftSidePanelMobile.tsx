import React, {useEffect, useState} from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Link from "next/link"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import MailIcon from '@mui/icons-material/Mail';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "@mui/material/Button"
import { useRouter } from "next/router"
import FileList from "@/components/editor/file/FileList"
import AccountArea from '@/components/editor/AccountArea';
import Actions from '@/components/editor/ActionsBottom';
import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';
import theme from '@/config/theme';
import AccountAreaMobile from '../AccountAreaMobile';

const drawerWidth = 240;



export default function LeftSidePanelMobile() {
  // const theme = useTheme();
  // const router = useRouter();
  // const { data: session } = useSession();
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)
  const {viewSettings, markdown, markdownSelected, saveStates} = app
  const {drawer: open} = viewSettings
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    if (isSmUp) {
      dispatch(appActions.openDrawer())
    }
    
  }, [isSmUp])

  console.log({open})


  return (
    <Drawer

    sx={{
      width: {xs: "100%", sm: drawerWidth},
      flexShrink: 0,
      // opacity: 0,
      '& .MuiDrawer-paper': {
        width: {xs: "100%", sm: drawerWidth},
        bgcolor: "gray.A100",
        boxSizing: 'border-box',
        height: "100vh",
        overflowY: "hidden",
        px: {xs: 1, sm: "auto"}
        // border: "1px solid blue",
      },
      // border: "3px solid red",
      position: {xs: "fixed", sm: "relative"},
      top: 0,
      left: 0,
      zIndex: {xs: open ? 1000 : "auto", sm: "auto"}
      
    }}
    variant="persistent"
    anchor="left"
    open={open}
  >
    <AccountAreaMobile />
    
    <Divider sx={{
      mb: 2
    }} />
    
    <Box sx={{
      overflowY: "auto",
      height: "calc(100vh - 150px)",
      maxHeight: "calc(100vh - 150px)",
      pb: 3,
      // border: "1px solid red",
      position: "relative",
    }}>
      <FileList />

      <Box sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        pb: 4,
        py: 2,
        // px: 1,
        // border: "1px solid blue"
      }}>
        <Actions />
      </Box>
    </Box>
    
    
  </Drawer>
  );
}

// http://localhost:3000/editor/New-Markdown-KMkTktr2BLriaLIuYVBB