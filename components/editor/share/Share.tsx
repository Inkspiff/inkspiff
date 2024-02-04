import React, {useState, useEffect, use} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from '@/store/app-slice';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router"
import { MembersType } from '@/types';
import { EMAIL_PATTERN } from '@/lib/utils';
import DoneIcon from '@mui/icons-material/Done';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { get } from 'http';
import VisibilityChange from './VisibilityChange';
import CopyLink from './CopyLink';
import AddMember from './AddMember';
import Members from './Members';

export default function Share() {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)
  const theme = useTheme()

  const [addingMember, setAddingMember] = useState<boolean>(false)
  const [memberEmailInput, setMemberEmailInput] = useState<string>("")
  const [shareAnchorEl, setShareAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const {markdown, markdownSelected} = app

  const {visibility} = markdown

  const openShare = Boolean(shareAnchorEl);
  const idOfSharePopup = openShare ? 'share-popover' : undefined;


  const handleToggleOpenShareAnchorEl = (event: React.MouseEvent<HTMLElement>) => {
    setShareAnchorEl(shareAnchorEl ? null : event.currentTarget);
  };
  
  const handleAddingMmeber = (val: boolean) => {
    setAddingMember(val)
  }

  return (
    <div>
       <IconButton sx={{
              borderRadius: "4px"
            }}  size="small" onClick={handleToggleOpenShareAnchorEl}>
              <ShareOutlinedIcon sx={{
                // color: "#121212"
              }}/>
              </IconButton>
      <Popover id={idOfSharePopup} open={openShare} anchorEl={shareAnchorEl}
       onClose={handleToggleOpenShareAnchorEl}
       anchorOrigin={{
         vertical: 'bottom',
         horizontal: 'left',
       }}
      >

        <Paper sx={{
             bgcolor: 'background.paper',
             maxWidth: "100%",
             width: {xs: "400px", sm: "400px"},
             border: "1px solid transparent",
             }} >
             
            <Typography variant="body1" component="h2" sx={{
          fontWeight: 700,
          my: 1,
          mx: 2,
        }}>Share</Typography>
        <Divider sx={{
          my: 0,
        }}/>
          {session ?  
            <>
               <AddMember open={openShare} onAddingMember={handleAddingMmeber} addingMember={addingMember} />
              <Divider sx={{
                my: 1,
              }}/>
              <Members open={openShare} addingMember={addingMember} />  
              <Divider sx={{
                my: 1,
              }}/>

              <Box 
                sx={{
                  px: 2,
                  mb: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <VisibilityChange open={openShare} />

                <CopyLink />
              </Box>   
            </>    
          : 
            <Box sx={{
              px: "8px",
              my: 1,
            }}>
              <Typography variant="body2" sx={{}}>Please login to create file links for free.</Typography>
              <Typography variant="body2" sx={{}}>Login</Typography>
            </Box>
          }
           
        </Paper>
      </Popover>
    </div>
  );
}