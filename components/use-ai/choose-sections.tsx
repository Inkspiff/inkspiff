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
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

interface propTypes {
    onUpdateSections: (sections: string[]) => void
}   

const ChooseSections = ({onUpdateSections}: propTypes) => {
    
    const [sections, setSections] = useState<string[]>([]);

    const handleAddSection = (index: number) => {
        if (!sections.includes(README_SECTION_DATA[index])) {
            setSections(prev => [...prev, README_SECTION_DATA[index]])
        } else {
            setSections(prev => {
                return prev.filter(section => section !== README_SECTION_DATA[index])
            })
        }
        
        onUpdateSections(sections)
      }

      

  return (
    <Box>
            
        
        <Typography variant="body1" sx={{
            mb: 1
        }}>Must Include: </Typography>
        <Box sx={{
            display:"flex",
            flexWrap: "wrap"
        }}>
        {README_SECTION_DATA.map((section, index) => {
                return <Chip
                key={index}
                label={section}
                onClick={() => {handleAddSection(index)}}
                onDelete={() => {handleAddSection(index)}}
                deleteIcon={(sections.includes(section)) ? <DoneIcon /> : <ClearRoundedIcon />}
                variant={(sections.includes(section)) ? "filled" : "outlined"}
                sx={{
                    mb: 1,
                    mr: 1,
                }}
              />
            })}
        </Box>
       
        </Box>
  )
}

export default ChooseSections