import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from '@/store/app-slice';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router"

export default function Share() {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)

  const [invitee, setInvitee] = useState<string>("")
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'share-popover' : undefined;


  const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setInvitee(e.currentTarget.value)
  }

  return (
    <>
       <IconButton sx={{
              borderRadius: "4px"
            }}  size="small" onClick={handleClick}>
              <ShareOutlinedIcon sx={{
                // color: "#121212"
              }}/>
              </IconButton>
      <Popover id={id} open={open} anchorEl={anchorEl}
       onClose={handleClick}
       anchorOrigin={{
         vertical: 'bottom',
         horizontal: 'left',
       }}
      >

        <Paper sx={{
             bgcolor: 'background.paper',
             maxWidth: "100%",
             width: {xs: "400px", md: "500px"},
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
               <Box sx={{
            px: "8px",
            my: 1,
            // border: "1px solid red",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
              <Box component="input" value={invitee} onChange={handleChange} sx={{
                border: "1px solid",
                borderColor: "grey.A200",
                p: "8px 8px",
                width: "calc(100% - 72px)",
                lineHeight: "16px",
                fontSize: "16px",
                borderRadius: "4px",
                mr: 1,
              }} />
                <Button variant="contained" size="small">invite</Button>
              </Box>

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
                <Typography variant="body2">Anyone with the link</Typography>
                <Typography variant="body2">Copy Link</Typography>
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
    </>
  );
}