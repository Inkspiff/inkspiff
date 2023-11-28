import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {SxProps} from '@mui/material';

const style = {
  
  
  '& .MuiDialog-paper': {
    maxWidth: "400px",
    width: '80%', 
    maxHeight: 400,
    px: 4,
    py: 2,
    borderRadius: "16px"
   } 
};

interface propTypes {
    open: boolean,
    onClose: () => void,
    children: React.ReactNode,
    sx?: SxProps, 
}

export default function EditorDialog({open, onClose, children, sx={}}: propTypes) {

    const handleClose = () => {
        onClose()
    }

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          ...style,
          ...sx
        }}
      >
          {children}
      </Dialog>
  );
}