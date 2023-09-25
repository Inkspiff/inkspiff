import React, {useState} from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Grid from '@mui/material/Grid';
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
import ChooseSections from "./choose-sections"
import AddContact from "./add-contact"
import UseAIForm from "./use-ai-form"

interface propTypes {
  onBack: () => void
}

const UseAI = ({onBack}: propTypes) => {

  const handleBack = () => {
    onBack()
  }

  return (
  <Box sx={{
    width: "100%",
    height: {xs: "auto", md: "100%"},
    // border: "1px solid blue",
    // py: {xs: "8px", md: "32px"},
    px: {xs: "8px", md: "32px"}
  }}>
    <Grid container sx={{
      // border: "1px solid red",
      height: {xs: "auto", md: "100%"},
    }}>
        <Grid item xs={12} md={4} sx={{
          height: {xs: "auto", md: "100%"},

        }}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            // border: "1px solid blue",
          height: {xs: "auto", md: "100%"},
          }}>
            <Box onClick={handleBack} sx={{
              m: 2,
              mt: 4,
              cursor: "pointer",
            }}>Back</Box>
            <Typography variant="h1" sx={{
            m: 2,
            mb: {md: 8},
            textAlign:{xs: "center", md: "left"}
            }}>Tell us about<br />that project.</Typography>
          </Box>


          
        </Grid>
        <Grid item xs={12} md={8} sx={{
          height: {xs: "auto", md: "100%"}
        }}>
          <Box sx={{
            height: {xs: "auto", md: "100%"},
            // border: "1px solid blue",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 4,
            px: {xs: "16px", md: "24px"}
          }}>
            <UseAIForm />
          </Box>
            
        </Grid>
    </Grid>
  </Box>
    
  )
}

export default UseAI