import React, {useState} from 'react';
import IconButton from '@mui/material/IconButton'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useSession, signIn, signOut } from "next-auth/react";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import FileOptions from '@/components/editor/files/FileOptions';
import { FileType } from '@/types/editor';

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
