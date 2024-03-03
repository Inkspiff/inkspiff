import React, {useContext, useState, ChangeEvent, useEffect} from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { ThemeContext } from '@/context/ThemeContext';
import { popupBaseStyle } from '@/config/editor';
import { set } from 'react-hook-form';
import Preview from '../layout/Preview';
import Input from "@mui/material/Input"
import GithubUsername from './GithubUsername';
import AddGithubRepo from './AddGithubRepo';
import GithubInstall from './GithubInstall';



const GithubPopup = () => {
    const dispatch = useDispatch()
    const { data: session } = useSession();
    const router = useRouter()
    const app = useSelector((state: RootState) => state.app)

    const {markdown: {automation}} = app

    const { viewSettings, markdownSelected } = app

    const open = viewSettings.popup === "github"



    const handleClose = () => {
        dispatch(appActions.setPopup(""))
    };

    console.log({automation})

    console.log(session?.user?.githubUsername)





  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Paper sx={{
            ...popupBaseStyle,
        }}>
          

          

     <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        p: 2,
      
      }}>
        <GithubUsername />
       <AddGithubRepo />
       {!automation && <GithubInstall />}
      </Box>

      
        </Paper>
      </Modal>
    </>
  )
}

export default GithubPopup