import React, {useState, useContext, useEffect} from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
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

interface FileListProps {
    idOfFileOpened: string | null;
    onOpenFile: (id: string) => void;
}

const FileList = ({idOfFileOpened, onOpenFile}:FileListProps) => {
  const { data: session } = useSession();
  const app = useSelector((state: RootState) => state.app)
  const { toggleTheme, theme} = useContext(ThemeContext);

  const {palette, } = theme
  const {mode } = palette

  const {fileList, markdownSelected} = app
  const [loadingFiles, setLoadingFiles] = useState(false)

  const handleOpenFile = (id: string) => {
    onOpenFile(id)
  }

  
  useEffect(() => { 
    // if (markdownSelected) {
        onOpenFile(markdownSelected)
    // }
  }, [])


  if (!session ) {
    return <NotLoggedIn />
  }

  return (
    <>

        {!!fileList 
        ? 
              <List>
                  {fileList.map((file, index) => {

                    return <ListItem key={index} sx={{
                      // border: "1px solid red",
                      p: 0,
                      m: 0,
                      px: "4px",
                    }}>
                      <ListItemButton  sx={{
                      // border: "1px solid blue",
                      p: "2px 12px",
                      m: 0,
                      borderRadius: "4px",
                      bgcolor: (idOfFileOpened === file.id) ? "action.hover" : ""
                    }}  onClick={() => {handleOpenFile(file.id)}}>
                        <ListItemText primary={<Typography sx={{
                      // border: "1px solid red",
                      p: 0,
                      m: 0,
                      fontSize: "12px",
                    }}>{file.title}</Typography>}/>
                      </ListItemButton>
                    </ListItem>
                  })}
              </List>
          
        : <Box>You don&apos;t have any files</Box>
        }
        
        
    </>
  )
}


export default FileList