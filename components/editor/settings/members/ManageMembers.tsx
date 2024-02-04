import React, {useState, useContext, useEffect} from 'react'
import Link from "next/link"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Switch from "@mui/material/Switch"
import Grid from "@mui/material/Grid"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import { ThemeContext } from '@/context/ThemeContext'
import NotLoggedIn from './NotLoggedIn'
import SecretLink from './SecretLink'
import Members from './Members'
import AddMember from './AddMember'
import FileList from './FileList'


const ManageMembers = () => {
  const { data: session } = useSession();
  const app = useSelector((state: RootState) => state.app)
  const { toggleTheme, theme} = useContext(ThemeContext);

  const {palette, } = theme
  const {mode } = palette

  const {viewSettings, fileList, markdown, markdownSelected} = app
  const [loadingFiles, setLoadingFiles] = useState(false)
  const [idOfFileOpened, setIdOfFileOpened] = useState<string | null>(null)
  const [memberEmail, setMemberEmail] = useState<string>("")
  const [addingMember, setAddingMember] = useState<boolean>(false)
  

  const handleOpenFile = (id: string) => {
    setIdOfFileOpened(id)
    console.log({id})
  }


  if (!session ) {
    return <NotLoggedIn />
  }

  return (
    <Box sx={{
      height: "100%",
      
    }}>
         <Typography variant="body1" component="h2" sx={{
          fontWeight: 700,
          mb: 2,
        }}>Members</Typography>
        <Divider sx={{
          my: 2
        }}/>

        {!!fileList 
        ? <Grid container sx={{
          height: "calc(100% - 56px)"
        }}>
          <Grid item sm={4} sx={{
            height: "100%",
            overflowY: "auto",
            bgcolor: ( mode === "light") ? "rgb(251, 251, 250)" : "rgb(28, 28, 28)",
            borderRadius: "0 8px 8px 0",
            py: 2,
          }}>
             <FileList idOfFileOpened={idOfFileOpened} onOpenFile={handleOpenFile} />
          </Grid>
          <Grid item sm={8}>
            <Box sx={{
              
              p: 2,
            }}>
              {idOfFileOpened && <SecretLink idOfFileOpened={idOfFileOpened!} />}
                    
              {idOfFileOpened && <AddMember fileId={idOfFileOpened}  />}

              <Divider sx={{
                my: 2
              }} />

              {idOfFileOpened && <Members fileId={idOfFileOpened} reRun={addingMember} />}
              
            </Box>
          </Grid>
        </Grid>
          
        : <Box>You don&apos;t have any files</Box>
        }
        
        
    </Box>
  )
}

export default ManageMembers

/**
 * <LoadingButton
                  size="small"
                  onClick={handleAddMember}
                  loading={addingMember}
                  variant="outlined"
                  disabled
                >
                  <span>Add</span>
                </LoadingButton>
 */