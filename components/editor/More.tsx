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
import LoginModal from '@/components/auth/login-modal';

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
  const {content, lastEdited} = markdown
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [duplicating, setDuplicating] = useState(false)
  const [copied, setCopied] = useState<boolean>(false);

  
  const handleToggleShowLoginModal = () => {
    dispatch(appActions.toggleOpenLoginModal())
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
      dispatch(appActions.toggleOpenLoginModal())
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


    const handleOpenConfirmDelete = () => {
      setAnchorEl(null)
      if (session) {
        setShowConfirmDelete(true)
      } else {
        dispatch(appActions.toggleOpenLoginModal())
      }
      
  }

  const handleCloseConfirmDelete = () => {
    setShowConfirmDelete(false)
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
      if (session){
        console.log("Import")
      } else {
      dispatch(appActions.toggleOpenLoginModal())
      }
      
    }
    const handleExport = () => {
       if (session){
        console.log("Export")
      } else {
        dispatch(appActions.toggleOpenLoginModal())
      }
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
              <ListItemButton onClick={handleOpenConfirmDelete}>
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
              display: "flex",
              flexDirection: "column"
            }}>
              <Typography variant="caption" sx={{
                display: "block"
              }}>Word count: {content ? content.split(" ").length : 0}</Typography>
              
              {session ? 
              <Typography variant="caption">Last edited by: {`${session.user?.name} Today at ${lastEdited}`}</Typography> 
              : <Button variant="text" onClick={() => {
                router.push("/login")
              }}  sx={{
              mx: "auto",
              mt: 1,
              alignSelf: "center"
              }}>Login</Button>}
              </Box>      
            
        </Paper>
      </Popover>

      <EditorDialog open={showConfirmDelete} onClose={handleCloseConfirmDelete} >
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
        <Button onClick={handleCloseConfirmDelete}>Nope</Button>
        </DialogActions>
      </>}
       
      </EditorDialog>

      <EditorSnackbar message={"deleted"} open={deleted} onClose={handleDeleted} />
    
      
    </div>
  );
}