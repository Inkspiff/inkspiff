import React, {useState} from 'react'
import Link from "next/link"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Switch from "@mui/material/Switch"
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useRouter } from "next/router"

const NotificationsSettings = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)

  const [allowed, setAllowed] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const handleAllowEmails = () => {
    if (session) {
      setAllowed(prev => !prev)
    }
    else {
      setShowLogin(true)
    }
  }

  return (
    <Box>
         <Typography variant="body1" component="h2" sx={{
          fontWeight: 700,
          mb: 2,
        }}>My Notifications</Typography>
        <Divider sx={{
          my: 2
        }}/>

        {showLogin ? 
        <Box>
          <Typography variant="body2" component="h4" sx={{
                  mb: 1
                }}>Please Login to enable email notifications.</Typography>
                <Typography variant="body2" sx={{
                  fontSize: "12px",
                mb: 1,
                }}> Unlock more features of inkspiff when you login.</Typography>
                
                <Link href="/login">
                  <Typography variant="body2" sx={{
                  mb: 2,
                  "&:hover": {
                    textDecoration: "underline"
                  }
                  }}>Login</Typography>
                </Link>
               
        </Box>
        :  <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
      }}>

          <Box>
              <Typography variant="body2" component="h4" sx={{
                  
              }}>Email Notifications</Typography>
              <Typography variant="caption" sx={{
              mb: 2,
              }}>Receive email updates, including mentions and comment replies.</Typography>
             
          </Box>

          <Switch checked={allowed} onClick={handleAllowEmails} />
      </Box>}
       
        
    </Box>
  )
}

export default NotificationsSettings