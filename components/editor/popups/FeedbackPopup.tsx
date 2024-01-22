import React, {useContext, useState, ChangeEvent} from 'react'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { ThemeContext } from '@/context/ThemeContext';
import { popupBaseStyle } from '@/config/editor';

const FeedbackPopup = () => {
    const dispatch = useDispatch()
    const { data: session } = useSession();
    const router = useRouter()
    const app = useSelector((state: RootState) => state.app)
    const { toggleTheme, theme} = useContext(ThemeContext);
    const [exportingFile, setExporttingFile] = useState(false)

    const {palette, } = theme
    const {mode } = palette
    const { markdown: {content, title}, viewSettings } = app

    const open = viewSettings.popup === "feedback"

  const handleClose = () => {
        dispatch(appActions.setPopup(""))
    };


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
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
          
            <Typography variant="h2" component="h3" sx={{
                fontWeight: 700,
                color: mode === "dark" ? "#fff" : "#000",
                textAlign: "center",
            }}>
                Feedback
            </Typography>
            
            <Typography variant="body1" component="p" sx={{
                fontSize: "1rem",
                color: mode === "dark" ? "#fff" : "#000",
                textAlign: "center",
                mb: 2
            }}>
                Export your file as a Markdown or HTML file.
            </Typography>
        
           
        </Paper>
      </Modal>
    </>
  )
}

export default FeedbackPopup