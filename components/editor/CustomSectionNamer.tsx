import React from "react"
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import Input from "@mui/material/Input"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import { SectionType } from "@/types/editor";
import {SUPPORTED_SECTIONS} from "@/config/editor"
import {splitIntoSections, uid} from "@/lib/utils"
import { matchSorter } from "match-sorter";
import Modal from '@mui/material/Modal';

const CustomSectionNamer = () => {
    const { data: session } = useSession()
    const dispatch = useDispatch()
    const app = useSelector((state: RootState) => state.app);

    const { markdown, viewSettings, saveStates, selectedSection, addedSections} = app;
    const {content: mainContent} = markdown
    const {drawer, sidebar} = viewSettings
    const [nameValue, setNameValue] = React.useState<string>("")

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setNameValue(e.target.value)
    }
  
    const handleCreateSection = () => {
        
        dispatch(appActions.addSection({
            id: uid(),
            name: nameValue,
            content: "Write your way... :)"
        }))
    }
   


    return <Box sx={{
        p: "8px"
    }}>
       <Typography variant="h6" sx={{
            mb: 2
        }}>Create custom section.</Typography>

        <Input 
        value={nameValue} 
        placeholder={"Section Name..."}
        endAdornment={<SearchOutlinedIcon />}
        disableUnderline={true}
        sx={{
          border: "1px solid",
          borderColor: "grey.A200",
          borderRadius: "6px",
          px: 1,
          mb: 2,
          "& .MuiInput-input": {
            // border: "1px solid blue",
          borderRadius: "6px",
          },

          "&:hover": {
            oultine: "none"
          }
        }}  
        type="text"
        onChange={handleNameChange}
        />

        <Button disabled={nameValue.trim() === ""} variant="text" size="small" onClick={handleCreateSection}>Create</Button>

       
    </Box>
}

export default CustomSectionNamer