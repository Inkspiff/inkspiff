import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface InputFileUploadProps {
    onClick: () => void
}


export default function InputFileUpload({onClick}: InputFileUploadProps) {
    const handleClick = () => { 
        onClick()
    }
  return (
    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} onClick={handleClick}>
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button>
  );
}