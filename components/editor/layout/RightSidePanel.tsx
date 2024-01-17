import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import ViewSidebarRoundedIcon from '@mui/icons-material/ViewSidebarRounded';
import Sections from "@/components/editor/sections/Sections"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, } from "next-auth/react";
import { useRouter } from "next/router"


export default function RightSidePanel() {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)
  const {viewSettings } = app

  const {sidebar: open} = viewSettings

  

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      dispatch(appActions.toggleSidebar());
    };


  const panelContent = () => (
    <Box
      sx={{ 
        width: 250,
        // border: "1px solid blue",
        height: "100%",
        top: {xs: "54px", md: "64px"},
        display: {xs: "none", sm: "block"},
     }}
      role="presentation"
    >
      <Sections />
    </Box>
  );

  const iOS =
  typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);




  return (
    <Box sx={{ display: {xs: "none", sm: "flex"}, }}>
     
        <React.Fragment >
          <IconButton onClick={toggleDrawer(true)} sx={{
            borderRadius: "4px",
            display: {xs: "none", sm: "inline-flex"}
          }}  size="small">
              <ViewSidebarRoundedIcon sx={{
                // color: "#121212"
              }}/>
            </IconButton>
          <SwipeableDrawer
            anchor={"right"}
            open={open}
            variant="persistent"
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            disableSwipeToOpen={false}
            sx={{
              // border: "3px solid red",
              flexShrink: 0,
            }}
            ModalProps={{
              sx: {
                // border: "2px solid green",
              }
            }}
            hideBackdrop={true}
            PaperProps={{
              sx: {
                width: 250, 
                height: "calc(100% - 45px)",
                boxSizing: 'border-box',
                top: {xs: "45px", sm: "45px"}
              }
            }}
            
            disableBackdropTransition={!iOS} disableDiscovery={iOS}
          >
            {panelContent()}
           
          </SwipeableDrawer>
        </React.Fragment>
    </Box>
  );
}