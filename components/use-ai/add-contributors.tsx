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
    onUpdateContributors: (contributors: ContributorType[]) => void
}

const AddContributors = ({onUpdateContributors}: propTypes) => {
    
    const [contributors, setContributors] = useState<ContributorType[]>([])
    const [contrName, setContrName] = useState<string>("")
    const [contrRole, setContrRole] = useState<string>("")
    const [contrLink, setContrLink] = useState<string>("")
    
  const handleChangeContrName = (event: any) => {
    setContrName(event.target.value)
  }
  const handleChangeContrLink = (event: any) => {
    setContrLink(event.target.value)
  }
  const handleChangeContrRole = (event: any) => {
    setContrRole(event.target.value)
  }


  const handleAddContributor = () => {
  

    const newContr = { 
        name: contrName,
        role: contrRole || "",
        link: contrLink || ""
    }
    setContributors(prevContr => [...prevContr, newContr])
    setContrName("")
    setContrRole("")
    setContrLink("")
  }
  const removeContributor = (index: number) => {
    
    // setContributors(prevContr => [...prevContr, newContr])

  }

  return (
    <Box>
        Contributors
       <Box>
       <TextField 
            fullWidth
            maxRows={1}
            onChange={handleChangeContrName}
            value={contrName}
            placeholder={"Name"}
        />
         <TextField 
            fullWidth
            maxRows={1}
            onChange={handleChangeContrRole}
            value={contrRole}
            placeholder={"Role"}
        />
         <TextField 
            fullWidth
            maxRows={1}
            onChange={handleChangeContrLink}
            value={contrLink}
            placeholder={"Link"}
        />
        <Button onClick={handleAddContributor}>ADD</Button>
        </Box>
    </Box>
  )
}

export default AddContributors