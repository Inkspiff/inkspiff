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

interface propTypes {
  onClose: () => void
}

const CustomSectionNamer = ({onClose}: propTypes) => {
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

      if (nameValue.trim() === "") {
        return
      }

      const newSection = {
        id: uid(),
        name: nameValue,
        content: `## ${nameValue}\nWrite your way... :)\n`
    }
        
        dispatch(appActions.addSection(newSection))

        setTimeout(() => {
          dispatch(appActions.selectSection(newSection))
      }, 0)

      onClose()
    }
   


    return <Box sx={{
        p: "8px",
        // border: "1px solid red"
    }}>
       <Typography variant="h4" sx={{
            mb: 2
        }}>Create custom section.</Typography>

      <Box sx={{
        // border: "1px solid blue",
        display: "flex",
        // flexDirection: "column",
        alignItems: "center",
        
      }}>
      <Input 
        value={nameValue} 
        placeholder={"Section Name..."}
        disableUnderline={true}
        fullWidth
        sx={{
          border: "1px solid",
          borderColor: "grey.A200",
          borderRadius: "6px",
          px: 1,
          // mb: 2,
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

        <Button disabled={nameValue.trim() === ""} variant="text" size="small" onClick={handleCreateSection} sx={{
          // border: "1px solid red",
          mt: 0, 
          ml: 1,
        }}>Create</Button>

      </Box>
        
       
    </Box>
}

export default CustomSectionNamer