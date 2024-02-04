import React, {useState, useContext, useEffect} from 'react'
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Switch from "@mui/material/Switch"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";

interface SecretLinkProps {
    idOfFileOpened: string;
}


const SecretLink = ({idOfFileOpened}: SecretLinkProps) => {
  const { data: session } = useSession();
  const app = useSelector((state: RootState) => state.app)

  const [secret, setSecret] = useState<
  {
    hash: string, 
    state: 'active' | 'inactive'} | null>(null)
  const [secretLoading, setSecretLoading] = useState<boolean>(false)

  
  const toggleSecretState = async () => {
    setSecretLoading(true);

    const response = await fetch("/api/db/toggle-secret-state", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mdID: idOfFileOpened,
      })
    })

    setSecretLoading(false)

    if (!response?.ok) {
      if (response.status === 402) {
        return 
      }
      return
    }

    const json = await response.json()
    setSecret(json)
  };

  useEffect(() => {
    
    const getSecret = async () => {
      console.log("get secret")
      setSecretLoading(true)
      const response = await fetch("/api/db/get-secret", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mdID: idOfFileOpened,
        })
      })

      setSecretLoading(false)

      if (!response?.ok) {
        if (response.status === 402) {
          return 
        }
        return
      }

      const secret = await response.json()
      console.log(secret)
      setSecret(secret)
    }

    if (idOfFileOpened) {
      getSecret()
    }
  }, [idOfFileOpened])

  const handleCopySecret = () => {
    navigator.clipboard.writeText(`https://inkspiff.com/invite/${secret!.hash}`)
  }


  return (
   <>
        <Box sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
              }}>

            <Box>
                <Typography variant="body2" component="h4" sx={{
                    
                }}>Invite link</Typography>
                <Typography variant="caption" sx={{
                mb: 2,
                }}>Share this secret link to invite people to this file. Only users who can invite members can see this. You can <span>reset this link</span> for all space members to generate a new invite link.</Typography>

            </Box>

            <Switch  />

        </Box>

        {secret && <Box>
            <Paper elevation={0} variant="outlined" sx={{
                display: "flex",
                alignItems: "center",
                py: 0.5,
                px: 1,
                
            }}>
                <Typography sx={{
                fontSize: "14px",
                }}>
                {`https://inkspiff.com/invite/${secret?.hash}`}
                
                </Typography>
            </Paper>
            
            <Button size="small" sx={{

            }} onClick={handleCopySecret}>Copy</Button>
        </Box>}
   </>
              
                    
             
  )
}

export default SecretLink
