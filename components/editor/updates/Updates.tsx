import React, {useEffect} from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import IconButton from "@mui/material/IconButton"
import Divider from "@mui/material/Divider"
import { useSession, signIn, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { getUpdatesText } from "@/lib/utils"

const UPDATES: {
    title: string,
    image: string,
    note: string
}[] = []

 const Updates = () => {
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app);
  const { data: session } = useSession();

  const {updates} = app

  useEffect(() => {
    const handleGetUpdates = async () => {
      const response = await fetch("/api/db/get-file-updates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id
        })
      })

      if (!response?.ok) {
        return 
      }

      const updates = await response.json()
      dispatch(appActions.setUpdates(updates))
    }
    handleGetUpdates()

  }, [])

  

    return <Box>
        <Typography variant="body1" component="h2" sx={{
          fontWeight: 700,
          mb: 2,
        }}>Updates</Typography>
        <Divider sx={{
          my: 2
        }}/>

        {(updates.length > 0) ? 
        <Box>
          {updates.map((update, index) => {
            const updateText = getUpdatesText(update)

            return <List key={index}>
                <Typography>{
                    updateText
                  }</Typography>
            </List>
          })}
        </Box> 
        
        : 
        <Box sx={{
            m: 2,
            p: 2,
            textAlign: "center",

        }}>
            No updates for now.
            </Box>}
    </Box>
}

export default Updates