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
import AddDemoImage from "./add-demo-image"
import AddContributors from "./add-contributors"
import chooseSections from "./choose-sections"
import ChooseSections from "./choose-sections"

interface propTypes {
    onUpdateContact: (contact: string) => void
}


const AddContact = ({onUpdateContact} : propTypes) => {
    const [contactInfo, setContactInfo] = useState<string>("")

    const handleChangeContactInfo = (event: any) => {
        setContactInfo(event.target.value)
      }
    

  return (
    <div>AddContact</div>
  )
}

export default AddContact