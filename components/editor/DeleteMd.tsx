import React, {useState, useEffect} from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useRouter } from "next/router"
import { useSession, signIn, signOut } from "next-auth/react";
import EditorDialog from '@/components/editor/EditorDialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import EditorSnackbar from '@/components/editor/EditorSnackbar';
import { string } from 'zod';
import { FileType } from '@/types/editor';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';

interface propTypes {
    file: FileType,
    onClose: () => void,
}

export default function FileOptionsMenu({file, onClose} : propTypes) {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)

  
  const {viewSettings, fileList, markdown, markdownSelected} = app
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [deleting, setDeleting] = useState(false)
  
    const deleteMd = async () => {
       setDeleting(true)
  
        const response = await fetch("/api/db/delete-md", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session!.user.id,
            mdId: markdown.id,
            
          })
        })
        
        setDeleting(false)
  
        if (!response?.ok) {
        // alert
          if (response.status === 402) {
            return 
          }
          return
        }


        const fileIndex = fileList.indexOf(file)

        const newIndex = (fileIndex + 1) >= fileList.length ? fileIndex - 1 : fileIndex + 1

        const newFile = fileList[newIndex]

        console.log({fileIndex, newIndex, fileList})

        dispatch(appActions.updateMarkdownSelected(newFile.id))
        dispatch(appActions.deleteFile(file.id))

      router.push({
        pathname: '/editor/[markdown-id]',
        query: {
          'markdown-id' : router.query['markdown-id'],
        },
      }, 
      `/editor/${newFile.title.split(" ").join("-")}-${newFile.id}`,
      {
        shallow: true
      })

        setDeleted(true)
  
      }

    const toggleShowConfirmDelete = () => {
        onClose()
        setShowConfirmDelete(prev => !prev)
    }
    
   
    const handleDeleted = () => {
        setDeleted(false)
    }

    useEffect(() => {
        if (deleted) {
            setTimeout(() => {
                setDeleted(false)
            }, 3000)
        }

    }, [deleted])
  return (
    <>
    
    <MenuItem onClick={toggleShowConfirmDelete} sx={{
            borderRadius: "4px"
          }}>
            <ListItemIcon>
            <DeleteOutlineRoundedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={<Typography sx={{
              fontSize: "14px"
            }}>Delete</Typography>}></ListItemText>
            <Typography variant="body2" color="text.secondary" sx={{
              fontSize: "12px"
            }}>
              ⌘X
            </Typography>
          </MenuItem>
    


        
      <EditorDialog open={showConfirmDelete} onClose={toggleShowConfirmDelete} >
      {deleting ? <Box>Deleting</Box> : <>
      <DialogTitle id="alert-dialog-title">
          {"Confirm Delete!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            file name
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => {deleteMd()}}>Sure</Button>
        <Button onClick={toggleShowConfirmDelete}>Nope</Button>
        </DialogActions>
      </>}
       
      </EditorDialog>

      <EditorSnackbar message={"deleted"} open={deleted} onClose={handleDeleted} />
    
    </>
   

  );
}