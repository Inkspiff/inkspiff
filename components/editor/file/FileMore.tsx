import React, {useEffect, useState} from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Link from "next/link"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import MailIcon from '@mui/icons-material/Mail';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "@mui/material/Button"
import { useRouter } from "next/router"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FileOptions from '@/components/editor/file/FileOptions';
import { FileType } from '@/types/editor';
import { truncateSync } from 'fs';

interface propTypes {
    file: FileType
}

export default function FileMore({file}:propTypes) {

  const { data: session } = useSession();
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)
  const {viewSettings, fileList, markdown, markdownSelected} = app
  const [loadingFiles, setLoadingFiles] = useState(false)
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
 



  const handleCloseOptions = () => {
    setAnchorEl(null);
    setSelectedFile(null)
  };
  

const handleOpenOptions = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Stop event propagation
    setAnchorEl(e.currentTarget);
    
}
  

  
  

 


  return (
    
   <>
         <IconButton 
         id="file-more-button"
         size="small" sx={{
          borderRadius: "4px",
          p: "2px",
         }} onClick={handleOpenOptions}>
        < MoreHorizRoundedIcon />
         </IconButton>

         <FileOptions file={file} anchorEl={anchorEl} onClose={handleCloseOptions} />
      
   </>
  );
}
