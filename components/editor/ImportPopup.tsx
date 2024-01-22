import React, {useContext, useState, ChangeEvent} from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { ThemeContext } from '@/context/ThemeContext';
import { popupBaseStyle } from '@/config/editor';
import { set } from 'react-hook-form';
import Preview from './Preview';


const ImportPopup = () => {
    const dispatch = useDispatch()
    const { data: session } = useSession();
    const router = useRouter()
    const app = useSelector((state: RootState) => state.app)
    const { toggleTheme, theme} = useContext(ThemeContext);
    const [markdownContent, setMarkdownContent] = useState<string | null>(null);
    const [markdownName, setMarkdownName] = useState<string>("");
    const [creatingFile, setCreatingFile] = useState(false)


    const {palette, } = theme
    const {mode } = palette

  const { markdown: {content, title}, viewSettings } = app

    const open = viewSettings.popup === "import"

  const handleClose = () => {
      setMarkdownContent(null)
        dispatch(appActions.setPopup(""))
    };


  const handleImportFile = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("File")
    const file = event.target.files?.[0];

    if (file) {
      const isMarkdownFile = file.name.toLowerCase().endsWith('.md');

      if (isMarkdownFile) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const content = e.target?.result as string;
          
          // Remove file extension from the name
        const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");

            setMarkdownName(fileNameWithoutExtension);
          setMarkdownContent(content);
        };

        reader.readAsText(file);
      } else {
        alert('Please upload a valid Markdown (.md) file.');
      }
    }
  }

  const handleImportFileToEditor = async () => {
    setCreatingFile(true)

        const newMdData = {
          title: markdownName,
          content: markdownContent,
          admin: session!.user.id,
        }

    
        const response = await fetch("/api/db/create-md", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMdData)
    
        })
    
        // setShowCreating(false)
        if (!response?.ok) {
          // handle wahalas
        } 
    
        const json = await response.json()
        console.log(json)
    
        router.push({
            pathname: '/editor/[markdown-id]',
            query: {
              'markdown-id' : router.query['markdown-id'],
            },
          }, 
          `/editor/${markdownName.trim().split(" ").filter(a => a !== " ").join("-")}-${json.id}`,
          {
            shallow: true
          })
        
          dispatch(appActions.addFile(
            {
              id: json.id,
              title: markdownName
            }
          ))
          
        dispatch(appActions.updateMarkdownSelected(json.id))
  }




  

  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Paper sx={{
            ...popupBaseStyle,
        }}>
          

          

      {!markdownContent && <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        p: 2,
      
      }}>
        <Typography variant="h2" component="h3" sx={{
          fontWeight: 700,
          mb: 1,
        }}>Import</Typography>
        <Typography variant="body1" sx={{
            mb: 2
            }}>Import a markdown file from your device.</Typography>
        <input type="file" accept=".md" onChange={handleImportFile} />
      </Box>}

      {markdownContent && <Box sx={{
        position: "relative",
        height: "100%",
        width: "100%",
        
        p: 2
      }}>
        <Box sx={{
            borderRadius: "8px",
            overflowX: "hidden",
            overflowY: "auto",
            flexDirection: "column",
            height: "100%",
            flex: 1,
        }}>
        
        <Preview doc={markdownContent} />
        </Box>

        <Box sx={{
            position: "absolute",
            bottom: "0px",
            left: "0px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            p: 2,
            marginBottom: 2,
        }}>
             <Button variant="contained" onClick={handleClose} sx={{
                mr: 2
             }}>Cancel</Button>

        <Button variant="contained" 
        onClick={handleImportFileToEditor} sx={{
            ml: 2
        }}>Import</Button>
        </Box>
        

      </Box>}
        </Paper>
      </Modal>
    </>
  )
}

export default ImportPopup