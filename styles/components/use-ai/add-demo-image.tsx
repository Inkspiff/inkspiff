import React, {useState} from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { README_SECTION_DATA, README_TYPES_DATA, README_LICENSE_DATA, } from "@/config/use-ai"
import { ContributorType } from "@/types"

interface propTypes {
    onUpdateImages: (images: string[]) => void
}

const AddDemoImage = ({onUpdateImages}: propTypes) => {
    const [images, setImages] = useState<string[]>([]) 
    const [image, setImage] = useState<string>("") 

    const handleAddImage = () => {
        setImages(prev => [...prev, image]);
        setImage("")
        setTimeout(() => {
            onUpdateImages(images)
        }, 0)
        
      };

      const handleDeleteImage = (_img: string) => {
        setImages(prev => prev.filter(img => img !== _img));
        setTimeout(() => {
            onUpdateImages(images)
        }, 0)
      };
    
      const handleChangeImage = (event: any) => {
        setImage(event.target.value);
      };

  return (
     <Box>
        <TextField 
            fullWidth
            maxRows={1}
            onChange={handleChangeImage}
            value={image}
            placeholder={"Image link"}
        /> 
        <Button onClick={handleAddImage}>ADD</Button>
        <Box>
            {images.map((img, index) => {
                return <Box key={index}>
                    <Typography >{img}</Typography>
                    </Box>
            })}
        </Box>
    </Box>
  )
}

export default AddDemoImage