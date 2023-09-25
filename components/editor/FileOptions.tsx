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
import EditorModal from '@/components/editor/EditorModal';
import LoginModal from '@/components/editor/LoginModal';
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
    anchorEl: null | HTMLElement
}

export default function FileOptionsMenu({file, anchorEl, onClose} : propTypes) {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)


   const openOptions = Boolean(anchorEl);
  
  const {viewSettings, fileList, markdown, markdownSelected} = app
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [duplicating, setDuplicating] = useState(false)
  const [copied, setCopied] = useState<boolean>(false);

  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginModalTexts, setLoginModalTexts] = useState<{text: string, subText: string}>({ text: "", subText: ""})

  const handleToggleShowLoginModal = () => {
    setShowLoginModal(prev => !prev)
  }


  const handleCopy = () => {
    onClose()
    if (session) {
      navigator.clipboard.writeText(markdown.content);
      setCopied(true)

      setTimeout(() => {
                setCopied(false)
      }, 3000);
    } else {
      handleToggleShowLoginModal()
      setLoginModalTexts({
        text: "Can't use link without login",
        subText: "Go to login page",
      })
    }
  
}
  
    const deleteMd = async () => {
      if (session) {
        setShowConfirmDelete(false)
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
        
        console.log({response})
        setDeleting(false)
  
        if (!response?.ok) {
        //   dispatch(appActions.updatedSaveStates({
        //     saving: false,
        //     saveFailed: true
        //   }))

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
      } else {
        dispatch(appActions.updateMarkdownSelected(""))
        dispatch(appActions.updateFileList([]))
      }
      
    }

    const toggleShowConfirmDelete = () => {
        onClose()
        setShowConfirmDelete(prev => !prev)
    }
    
    useEffect(() => {
        if (deleted) {
            setTimeout(() => {
                setDeleted(false)
            }, 3000)
        }

    }, [deleted])

    const handleDeleted = () => {
        setDeleted(false)
    }

    const handleDuplicate = async () => {
      onClose()
      if (session ) {
        setDuplicating(true)
        const newMdData = {
          title: markdown.title,
          content: markdown.content,
          admin: session!.user.id,
        }
    
        const response = await fetch("/api/db/create-md", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMdData)
    
        })
    
        setDuplicating(false)
        if (!response?.ok) {
          // handle wahalas
          return
        } 
    
        const json = await response.json()
  
        dispatch(appActions.updateFileList([
          ...fileList, 
          {
          id: json.id,
          title: markdown.title
        }]))
      }
      else {
        handleToggleShowLoginModal()
      }
    }

    const handleRename = () => {}


    const n = [
      {
        text: "Delete",
        command: "⌘X",
        icon: <DeleteOutlineRoundedIcon fontSize="small" />,
        action: toggleShowConfirmDelete,
      },
      {
        text: "Duplicate",
        command: "⌘X",
        icon: <ContentCopy fontSize="small" />,
        action: handleDuplicate,
      },
      {
        text: "Copy Link",
        command: "⌘X",
        icon: <LinkRoundedIcon  fontSize="small" />,
        action: handleCopy,
      },
      // {
      //   text: "Rename",
      //   command: "⌘X",
      //   icon: <DriveFileRenameOutlineOutlinedIcon fontSize="small" />,
      //   action: handleRename,
      // }

    ]
    
  return (
    <>
    <Menu
        id="file-more"
        anchorEl={anchorEl}
        open={openOptions}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': 'file-more-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
       
      >
          <Paper sx={{ 
            width: 240, 
            maxWidth: '100%',
            p: 0 }} elevation={0}>
      <MenuList sx={{
        // border: "1px solid red",
        padding: "8px 0px",
        mx: 0,
      }}>
        {n.map((item, index) => {
          return <MenuItem key={index} onClick={item.action} sx={{
            borderRadius: "4px",
            padding: "4px 8px"
          }}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={<Typography sx={{
              fontSize: "14px"
            }}>{item.text}</Typography>}></ListItemText>
            <Typography variant="body2" color="text.secondary" sx={{
              fontSize: "12px"
            }}>
              {item.command}
            </Typography>
          </MenuItem>
        })}
        
      </MenuList>
      </Paper>
      </Menu>


        
      <EditorDialog open={showConfirmDelete} 
      onClose={toggleShowConfirmDelete} 
      sx={{

      }} >
      {deleting ? <Box>Deleting</Box> : <>
      <DialogTitle id="alert-dialog-title">
          {"Confirm Delete!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {file.title}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{
        
        }}>
        <Button onClick={() => {deleteMd()}} size="small">Sure</Button>
        <Button onClick={toggleShowConfirmDelete} variant="outlined" size="small">Nope</Button>
        </DialogActions>
      </>}
       
      </EditorDialog>

      <EditorSnackbar message={"deleted"} open={deleted} onClose={handleDeleted} />

      <EditorModal open={showLoginModal} onClose={handleToggleShowLoginModal} >
        <LoginModal text={loginModalTexts.text} subText={loginModalTexts.subText} />
      </EditorModal>
    
    </>
   

  );
}