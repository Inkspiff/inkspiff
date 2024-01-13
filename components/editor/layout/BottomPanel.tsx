import React, {useEffect, useState} from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Link from "next/link"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import PlusOneRoundedIcon from '@mui/icons-material/PlusOneRounded';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "@mui/material/Button"
import { useRouter } from "next/router"
import FileList from "@/components/editor/file/FileList"
import AccountArea from '@/components/editor/AccountArea';
import Actions from '@/components/editor/Actions';
import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';
import theme from '@/config/theme';
import AccountAreaMobile from '../AccountAreaMobile';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Sections from '../sections/Sections';
import Blocks from '../block-view/Blocks';

const BottomPanel = () => {
    const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)
  const {viewSettings} = app
const {bottomPanel} = viewSettings




  const handleClosePanel = () => {
    dispatch(appActions.closeBottomPanel())
  }

 const handleOpenPanel = () => {
    dispatch(appActions.openBottomPanel("default"))
  }

  const handleUseAi = () => {
    // dispatch(appActions.openBottomPanel("ai"))
    console.log("use ai")
  }

  const handleOpenBlocksPanel = () => {
    dispatch(appActions.openBottomPanel("blocks"))
  }

  const handleOpenSectionsPanel = () => {
    dispatch(appActions.openBottomPanel("sections"))
  }

  const handleOpenMediaPanel = () => {
    dispatch(appActions.openBottomPanel("media"))
  }



  const handleUndo = () => {
    // ...
    console.log("undo")
  }

  const handleRedo = () => {
    // ...
    console.log("redo")
  }

  const iOS =
  typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);



    return <Box sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        display: {xs: "block", sm: "none"},
        border: "2px solid red",
    }}>
        <Paper elevation={0} variant="outlined" sx={{
            px: 2,
            py: 1,
            display: "flex",
            justifyContent: "space-between",
            border: "1px solid blue",
        }}>
            <IconButton sx={{
            }} onClick={handleUseAi}>
                <PlusOneRoundedIcon /> 
                {/* AI */}
            </IconButton>
            
            <IconButton sx={{
            }} onClick={handleOpenBlocksPanel} >
                <PlusOneRoundedIcon /> 
                {/* plus */}
            </IconButton>

            <IconButton sx={{
            }} onClick={handleOpenSectionsPanel}>
                <PhotoAlbumIcon />
                {/* section */}
            </IconButton>

            <IconButton sx={{
            }} onClick={handleOpenMediaPanel}>
                <PhotoAlbumIcon />
                {/* photo */}
            </IconButton>

            <IconButton sx={{
            }} onClick={handleUndo}>
                <PhotoAlbumIcon />
                {/* undo */}
            </IconButton>

            <IconButton sx={{
            }} onClick={handleRedo}>
                <PhotoAlbumIcon />
                {/* redo */}
            </IconButton>
        </Paper>

        <SwipeableDrawer
        
        onOpen={handleOpenPanel}
        anchor="bottom"
        open={!!bottomPanel}
        onClose={handleClosePanel}
        disableBackdropTransition={!iOS} disableDiscovery={iOS}
        hideBackdrop={true}
        ModalProps={{
           
        }}
        sx={{
            '& .MuiDrawer-paper': {
                width: "100%",
                height: '45%',
                bgcolor: "background.paper",
                borderRadius: "16px 16px 0 0",
                overflowY: "auto",
                boxSizing: 'border-box',
                px: 2,
                py: 2,
              },
        }}
        
        >
            {(bottomPanel === "sections") && <Sections />}
            {(bottomPanel === "blocks") && <Blocks />}
            {(bottomPanel === "default") && <Box>
                Default
                </Box>}
            
        </SwipeableDrawer>
            </Box>
}

export default BottomPanel;