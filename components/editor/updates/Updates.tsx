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
  useCollection,
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
import Update from "./Update"

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
  const [updatesSnapshot] = useCollection(q);


  useEffect(() => {
    if (session) {
      if (updatesSnapshot && !updatesSnapshot.empty) {
        let newUpdates: FileUpdateType[] = []
  
        updatesSnapshot.docs.forEach((updateDoc: any) => {
          const update = updateDoc.data()
          newUpdates.push({
            id: updateDoc.id,
            type: update.type,
            from: update.from,
            to: update.to,
            message: update.message,
            sentAt: update.sentAt ? update.sentAt.seconds : 0,
            image: update.image,
            seen: update.seen,
            markdownID: update.markdownID,
          })
        })
  
        dispatch(appActions.setUpdates(newUpdates))
      }
    }
   
  }, [updatesSnapshot, session, dispatch])

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    onClose(event)
  }

  useEffect(() => {

    const unseeenUpdates = updates.filter((update) => update.seen === false)
    
    const seenUpdates = async () => { 
      
      const updateIds = unseeenUpdates.map((update) => update.id)

      await fetch("/api/db/updates/seen-updates", {
        method: "POST",
        body: JSON.stringify({
          updateIds,
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
    }

    

    if (session) {
      
      if ((unseeenUpdates.length > 0) && (anchorEl !== null)) {
        console.log("seen updates")
        seenUpdates()
      }
    } 
  }, [updates, anchorEl])

  console.log({updates})


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
      
       width: "400px",
       maxWidth: "100%",
       height: "300px",
       overflowY: "auto",
     }}>
      <Box>
        <Box sx={{
          px: 2,
          py: 1,
        }}>
          <Typography variant="body1" component="h2" sx={{
            fontWeight: 700,
          }}>Updates</Typography>
          
        </Box>
        <Divider sx={{
          }}/>
        

        {(updates.length > 0) ? 
        <Box>
          {updates.map((update, index) => {


            return <Update {...update} />
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
