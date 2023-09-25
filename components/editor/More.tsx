import React, {useState, useEffect} from 'react';
import EditorDialog from '@/components/editor/EditorDialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import EditorSnackbar from '@/components/editor/EditorSnackbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MuiList, {ListProps} from '@mui/material/List';
import MuiListItem, {ListItemProps} from '@mui/material/ListItem';
import MuiListItemButton, {ListItemButtonProps} from '@mui/material/ListItemButton';
import MuiListItemIcon, {ListItemIconProps} from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Switch from '@mui/material/Switch';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useRouter } from "next/router"
import { useSession, signIn, signOut } from "next-auth/react";
import { FileType } from '@/types/editor';
import Style from "@/components/appearance/Style"
import EditorModal from '@/components/editor/EditorModal';
import LoginModal from '@/components/editor/LoginModal';

const List = styled((props: ListProps) => (
  <MuiList {...props} />
))(({ theme }) => ({
  
  padding: "0 4px 0 4px"
  // ...theme.mixins.toolbar,
}));

const ListItem = styled((props: ListItemProps) => (
  <MuiListItem {...props} />
))(({ theme }) => ({
  padding: "0",
  // border: "1px solid red",
  
  // ...theme.mixins.toolbar,
}));

const ListItemButton = styled((props: ListItemButtonProps) => (
  <MuiListItemButton {...props} />
))(({ theme }) => ({
  // my: 0
  fontSize: "14px",
  borderRadius: "4px",
  padding: "4px 8px",
  alignItems: "center",

  // ...theme.mixins.toolbar,
}));



interface propTypes {
  file: FileType,
}


export default function More() {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
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

  const handleToggleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  const handleCopy = () => {
    setAnchorEl(null);
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
      setShowConfirmDelete(false)
      if (session) {
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

        const fileIndex = fileList.indexOf(fileList.filter(f => f.id === markdown.id )[0])

        const newIndex = (fileIndex + 1) >= fileList.length ? fileIndex - 1 : fileIndex + 1

        const newFile = fileList[newIndex]

        console.log({fileIndex, newIndex, fileList})

        dispatch(appActions.updateMarkdownSelected(newFile.id))
        dispatch(appActions.deleteFile(fileList[fileIndex].id))

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
        setAnchorEl(null)
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
      setAnchorEl(null)
      if (session) {
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
      } else {
        handleToggleShowLoginModal()
      }
    }

    const handleRename = () => {
      console.log("rename")
    }
    const handleUndo = () => {
      console.log("Undo")
    }
    const handleImport = () => {
      console.log("Import")
    }
    const handleExport = () => {
      console.log("Export")
    }

  const handleToggleFullscreen = () => {
    setAnchorEl(null)
    dispatch(appActions.toggleFullscreen())
  }

  const handleToggleBlocksView = () => {
    setAnchorEl(null)
    dispatch(appActions.toggleBlocksView())
  }
  

  return (
    <div>
       
              <IconButton sx={{
                borderRadius: "4px"
              }} onClick={handleToggleOpen} size="small">
                <MoreHorizRoundedIcon sx={{
                // color: "#121212"
              }} />
              </IconButton>
      <Popover id={id} open={open} anchorEl={anchorEl}
       onClose={handleToggleOpen}
       anchorOrigin={{
         vertical: 'bottom',
         horizontal: 'right',
       }}
      >

        <Paper sx={{
             px: 0, 
             py: 1,
             bgcolor: 'background.paper',
             width: "250px",
             maxHeight: "calc(100vh - 100px)",
             }}>
              
              <Typography component="h6" sx={{
                fontSize: "14px",
                fontWeight: 700,
                my: 1,
                mx: 1,
                mb: 2,
              }}>Style</Typography>

              <Style />
              

            <Divider sx={{
              my: "6px"
            }}/>

           <List >
            <ListItem>
              <ListItemButton onClick={handleToggleFullscreen}>
                <ListItemText primary={<Typography variant="body2" sx={{
            fontWeight: 500,

           }}>Full width</Typography>} />
                <Switch checked={viewSettings.fullscreen}/>
              </ListItemButton>
            </ListItem>
           </List>
           <List >
            <ListItem>
              <ListItemButton onClick={handleToggleBlocksView}>
                <ListItemText primary={<Typography variant="body2" sx={{
            fontWeight: 500,

           }}>Blocks View</Typography>} />
                <Switch checked={viewSettings.blocks}/>
              </ListItemButton>
            </ListItem>
           </List>

           
        

           <Divider sx={{
              my: "6px"
            }}/>

            <List >
            <ListItem >
              <ListItemButton  onClick={handleCopy}>
               <ListItemText primary={<Typography variant="body2" sx={{
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "14px",
            p: 0,

           }}>Copy Link</Typography>} />
              </ListItemButton>
            </ListItem>
            <ListItem >
              <ListItemButton onClick={handleDuplicate}>
              <ListItemText primary={<Typography variant="body2" sx={{
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "14px",
            p: 0,

           }}>Duplicate</Typography>} />
              </ListItemButton>
            </ListItem>

            </List>

            <Divider sx={{
              my: "6px"
            }}/>

            <List >
            <ListItem >
              <ListItemButton onClick={handleUndo}>
               Undo
              </ListItemButton>
            </ListItem>
            <ListItem >
              <ListItemButton onClick={toggleShowConfirmDelete}>
               Delete
              </ListItemButton>
            </ListItem>

            </List>

            <Divider sx={{
              my: "6px"
            }}/>

            <List >
            <ListItem >
              <ListItemButton onClick={handleImport}>
               Import
              </ListItemButton>
            </ListItem>
            <ListItem >
              <ListItemButton onClick={handleExport}>
               Export
              </ListItemButton>
            </ListItem>

            </List>

          <Divider sx={{
              my: "6px"
            }}/>

            <Box sx={{
              px:2,
              py: 1,
            }}>
              <Typography variant="caption" sx={{
                display: "block"
              }}>Word count: 10</Typography>
              <Typography variant="caption">Last edited by: {`Precious Nwaoha Today at 11: 48 PM`}</Typography>
              </Box>      
            
        </Paper>
      </Popover>

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
    
      <EditorModal open={showLoginModal} onClose={handleToggleShowLoginModal} >
        <LoginModal text={loginModalTexts.text} subText={loginModalTexts.subText} />
      </EditorModal>
    </div>
  );
}