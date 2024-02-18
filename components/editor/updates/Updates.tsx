import React, {useEffect} from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
// import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Popover from "@mui/material/Popover"
import { useSession, signIn, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { getUpdatesText } from "@/lib/utils"
import {
  useCollectionData,
} from "react-firebase-hooks/firestore";
import {
  collection,
  query,
  where,
  limit,
  orderBy
} from "firebase/firestore";
import { db } from "@/firebase";
import { FileUpdateType } from "@/types/editor"

interface UpdatesProps {
  anchorEl: null | HTMLElement,
  onClose: (event: React.MouseEvent<HTMLElement>) => void
}

 const Updates = ({anchorEl, onClose}: UpdatesProps) => {
  const dispatch = useDispatch();
  const app = useSelector((state: RootState) => state.app);
  const { data: session } = useSession();

  const open = Boolean(anchorEl)

  const {updates, markdownSelected, viewSettings, } = app

  const {popup} = viewSettings

  const updatesRef = collection(db, "updates")
  const q = query(updatesRef, where('to', 'array-contains', session?.user.id), orderBy('sentAt', 'desc'), limit(10));
  const [updatesFromDB] = useCollectionData(q);
  console.log("updatesFromDB: ", updatesFromDB)

  useEffect(() => {
    if (session) {
      if (updatesFromDB && updatesFromDB.length > 0) {
        let newUpdates: FileUpdateType[] = []
  
        updatesFromDB.forEach((update) => {
          newUpdates.push({
            type: update.type,
            from: update.from,
            to: update.to,
            message: update.message,
            sentAt: update.sentAt,
            image: update.image,
            seen: update.seen,
            markdownID: update.markdownID,
          })
        })
  
        dispatch(appActions.setUpdates(newUpdates))
      }
    }
   
  }, [updatesFromDB])

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    onClose(event)
  }


    return  <Popover id={open ? 'updates-popover' : undefined} open={open} anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={{
     vertical: 'top',
     horizontal: 'right',
   }}
   transformOrigin={{
     vertical: 'top',
     horizontal: 'left',
   }}
   >
     <Paper sx={{
       p: 2,
       width: "400px",
       maxWidth: "100%",
       height: "300px",
       overflowY: "auto",
     }}>
      <Box>
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
     </Paper>
   </Popover>
}

export default Updates
