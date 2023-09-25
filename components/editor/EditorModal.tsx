import * as React from 'react';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import {SxProps} from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxWidth: "90%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  
  
  p: 4,
};

interface propTypes {
    open: boolean,
    onClose: () => void,
    children: React.ReactNode,
    sx?: SxProps,
}

export default function EditorModal({open, onClose, children, sx={}}: propTypes) {

    const handleClose = () => {
        onClose()
    }

  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={{...style, ...sx}}>
          {children}
        </Paper>
      </Modal>
  );
}