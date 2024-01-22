import React, {useEffect, useState} from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Link from "next/link"
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from "react-redux";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Sections from '../sections/Sections';


const AddSectionBottomPanel = () => {

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
        
        <SwipeableDrawer
        onOpen={() => {}}
        onClose={() => {}}
        anchor="bottom"
        open={true}
        variant="persistent"
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
                // px: 2,
                py: 2,
                pt: 3,
              },
        }}
        
        >
          
            <Sections />
            
            
        </SwipeableDrawer>
            </Box>
}

export default AddSectionBottomPanel;