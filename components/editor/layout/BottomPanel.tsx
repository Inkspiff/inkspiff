import React, {useEffect, useState} from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Link from "next/link"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
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

import { PiMagicWandBold } from "react-icons/pi";
import { TbBrandDatabricks } from "react-icons/tb";
import { TbPhotoSquareRounded } from "react-icons/tb";
import { TbSection } from "react-icons/tb";
import { LuUndo } from "react-icons/lu";
import { LuRedo } from "react-icons/lu";

import { TbChevronCompactDown } from "react-icons/tb";

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Sections from '../sections/Sections';
import Blocks from '../blocks/Blocks';
import { BlockSelectItemType } from '@/types/editor';

interface BottomPanelProps {
  // open: boolean;
  onSelectBlock: (block: BlockSelectItemType) => void;
  onUndo: () => void;
  onRedo: () => void;
  // close: () => void;
}



const BottomPanel = ({onSelectBlock, onUndo, onRedo}: BottomPanelProps) => {
    const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)
  const {viewSettings} = app
const {bottomPanel} = viewSettings




  const handleClosePanel = () => {
    if (bottomPanel === "sections") {
      dispatch(appActions.toggleSidebar())
      setTimeout(() => {
        dispatch(appActions.closeBottomPanel())
      }, 0)
    } else {
      dispatch(appActions.closeBottomPanel())
    }
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
    dispatch(appActions.toggleSidebar())
    setTimeout(() => {
      dispatch(appActions.openBottomPanel("sections"))
    }, 0)
    
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
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        display: {xs: "block", sm: "none"},
        // border: "1px solid red",
        zIndex: 100,
    }}>
        <Paper elevation={0} variant="outlined" sx={{
            px: 2,
            py: 1,
            display: "flex",
            justifyContent: "space-between",
            borderRadius: "16px 16px 0 0",
        }}>
            <IconButton sx={{
            }} onClick={handleUseAi}>
                <PiMagicWandBold />
            </IconButton>
            
            <IconButton sx={{
            }} onClick={handleOpenBlocksPanel} >
                <TbBrandDatabricks />
            </IconButton>

            <IconButton sx={{
            }} onClick={handleOpenSectionsPanel}>
                <TbSection />
            </IconButton>

            <IconButton sx={{
            }} onClick={handleOpenMediaPanel}>
                <TbPhotoSquareRounded />
            </IconButton>

            <IconButton sx={{
            }} onClick={() => {
              onUndo()
            }}>
                <LuUndo />
            </IconButton>

            <IconButton sx={{
            }} onClick={() => {
              onRedo()
            }}>
                <LuRedo />
            </IconButton>
        </Paper>

        <SwipeableDrawer
        
        onOpen={handleOpenPanel}
        anchor="bottom"
        open={!!bottomPanel}
        variant="persistent"
        onClose={handleClosePanel}
        disableSwipeToOpen={false}
        disableBackdropTransition={!iOS} 
        disableDiscovery={iOS}
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
                pt: 3,
              },
        }}
        
        >
          <Box sx={{
            // border: "1px solid red",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: "0px",
            color: theme.palette.text.secondary,
            cursor: "pointer",
            "&:hover": {
              color: theme.palette.text.primary,
            },
          }} onClick={handleClosePanel}>
            <TbChevronCompactDown style={{
              fontSize: "32px",
            }} />
          </Box>
            {(bottomPanel === "sections") && <Sections />}
            {(bottomPanel === "blocks") && <Blocks onSelect={onSelectBlock} />}
            {(bottomPanel === "media") && <Grid container spacing={1} sx={{
              border: "1px solid red",
              height: "100%",
              alignItems: "center"
            }}>
                <Grid item xs={6}>
                  <Paper sx={{
                    textAlign: "center",
                    border: "1px solid red"
                  }}>
                    <Typography variant={"h2"}>
                      Inline Media
                    </Typography>
                    <Button variant='contained'>
                      Upload
                    </Button>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                <Paper sx={{
                    textAlign: "center",
                    border: "1px solid red"
                  }}>
                    <Typography variant={"h2"}>
                      Banner Image
                    </Typography>
                    <Button variant='contained'>
                      Upload
                    </Button>
                  </Paper>
                </Grid>
              </Grid>}
            {(bottomPanel === "default") && <Box>
                Default
                </Box>}
            
        </SwipeableDrawer>
            </Box>
}

export default BottomPanel;