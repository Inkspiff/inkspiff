import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from "react-redux";
import { useSession, signIn, signOut } from "next-auth/react";
import { RootState } from "@/store";
import { appActions } from '@/store/app-slice';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import {SxProps} from '@mui/material';
import {MdCancel} from "react-icons/md"
import { useRouter } from "next/router"

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "100%",
  maxWidth: {xs: "400px", md: "540px"},
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: "16px",

  p: 2,
};

interface propTypes {
    text?: string,
    subText?: string,
}

export default function LoginModal({text="", subText=""}: propTypes) {
    const router = useRouter();
    const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)

  const {openLoginModal, } = app

    const handleLogin = () => {
        dispatch(appActions.toggleOpenLoginModal());
        router.push("/login")
    }

    const handleClose = () => {
        dispatch(appActions.toggleOpenLoginModal());
     }

  return (
    <Modal open={openLoginModal} 
    aria-labelledby="login modal"
    aria-describedby="login from inside editor"
  >
    <Paper sx={{
        ...style, 
    }}>

        <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%"
        }}>
            <IconButton  sx={{
                alignSelf: "flex-end"
            }} onClick={handleClose}> 
                <MdCancel />
            </IconButton>
        </Box>
            


        <Box sx={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                p: 2,
            }}>
            
           
            <Typography variant="h3" sx={{
                mb: 2,
            }}>Take full advantage of Inkspiff for free</Typography>

            <Grid container spacing={2}>
                <Grid item sm={6}>
                    
                </Grid>
                <Grid item sm={6}></Grid>
            </Grid>
             <Typography variant="body1" sx={{
                mb: 2,
            }}>login to enjoy all the true power of Inkspiff.</Typography>
           
            <Button onClick={handleLogin} variant="text">Login</Button>
        </Box>
    </Paper>
        
    </Modal>
        
  );
}