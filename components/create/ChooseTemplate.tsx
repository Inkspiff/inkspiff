import React, {useEffect, useState, ChangeEvent} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Input from "@mui/material/Input"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import { useRouter } from 'next/router';
import { TemplateType } from '@/types';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import Preview from "@/components/editor/Preview"
import ViewTemplate from '@/components/create/ViewTemplate';
import Templates from '@/components/templates/Templates';
import { useSession, signIn, signOut } from "next-auth/react";
import { TextField } from '@mui/material';


interface TemplatesInterface {
  onSelected: (template: TemplateType) => void,
  onBack: () => void,
}

// Changed

const ChooseTemplate = ({onSelected, onBack}: TemplatesInterface) => {
  const { data: session } = useSession();

  const dispatch = useDispatch()
  const router = useRouter()
  const app = useSelector((state: RootState) => state.app)
  const [loading, setLoading] = useState(false)
  const [viewingTemp, setViewingTemp] = useState<null | number>(null);
  const [loadingSelectedTemp, setLoadingSelectedTemp] = useState(false);
  const [searchInput, setSearchInput] = useState("")
  const {templates} = app
  
  const handleChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }
   
  const handleViewTemplate = (index: number) => {
    setViewingTemp(index)
  }

  const handleBackToAllTemps = () => {
    setViewingTemp(null)
  }

  const handleSelectTemplate = async (index: number) => {
    setLoadingSelectedTemp(true)
    onSelected(templates[index])

  }

  const handleBack = () => {
    onBack()
  }

  useEffect(() => {
    const getTemplates = async () => {
      setLoading(true)

      const response = await fetch("/api/db/get-templates", {
        method: "GET"
      })
  
      setLoading(false)

      if (!response?.ok) {
        // handle wahalas
      } 
  
      const temps = await response.json()
      
      dispatch(appActions.updateTemplates(temps))
    }


    if (session) {
      getTemplates()
    }
    
  }, [])





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
            mb: {xs: 4, md: 8},

            textAlign:{xs: "center", md: "left"}
            }}>Pick a<br />template.</Typography>
          </Box>


          
        </Grid>

        <Grid item xs={12} md={8} sx={{
          height: {xs: "auto", md: "100%"}
        }}>
          <Box sx={{
            height: {xs: "auto", md: "100%"},
            // border: "1px solid blue",
            // display: "flex",
          }}>
            <Box sx={{
              // border: "1px solid red",
              py: 0.5,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}>
                <Input 
                // fullWidth
                value={searchInput} 
                placeholder={"Search..."}
                startAdornment={<SearchOutlinedIcon />}
                type="search"
                onChange={handleChangeSearchInput}
                  sx={{
                    borderRadius: "8px",
                    width: "100%",
                    maxWidth: "400px",
                    px: 1,
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&.MuiInputBase-root": {
                      border: "1px solid",
                      borderColor: "grey.A400",
                      bgcolor: "action.hover",
                    },
                    "&.MuiInputBase-root:hover": {
                      border: "1px solid",
                      borderColor: "grey.A400",
                      borderBottom: "1px",
                      bgcolor: "grey.A300",
                    },
                    "&.MuiInputBase-root::before": {
                      border: "none",
                    },
                  }}
                  inputProps={{
                   sx: {
                    "&.MuiInput-input": {
                      // border: "1px solid red",
                      width: "auto",
                    minWidth: "auto",
                    },
                    "&.MuiInput-input::affter": {
                      border: "none",
                      width: "auto",
                    minWidth: "auto",
                    },
                    
                    textAlign: "center",
                   }
                  }}

                  
                />
            </Box>

            
            {loading ? <Box>
              Loading
            </Box> 
            : <Box sx={{
              // border: "1px solid blue",
              // display: "inline-flex",
              width: "100%",
            }}>

                  {templates && <>
                    {(viewingTemp !== null )? 
                    <ViewTemplate title={templates[viewingTemp].name} content={templates[viewingTemp].content} onBack={handleBackToAllTemps} />
                    : <Templates onViewTemp={handleViewTemplate} />
                  }
                    
                    
                  </>}
                  
                  
            </Box>}
          </Box>
            
        </Grid>
    </Grid>

      
      
      
    </Box>
  )
}

export default ChooseTemplate

