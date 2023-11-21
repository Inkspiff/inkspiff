import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import { useRouter } from 'next/router';
import { TemplateType } from '@/types';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import Preview from "@/components/editor/Preview"
import ViewTemplate from '@/components/ViewTemplate';
import Templates from '@/components/Templates';

interface TemplatesInterface {
  onSelected: (template: TemplateType) => void,
  onBack: () => void,
}

const ChooseTemplate = ({onSelected, onBack}: TemplatesInterface) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const app = useSelector((state: RootState) => state.app)
  const [loading, setLoading] = useState(false)
  const [viewingTemp, setViewingTemp] = useState<null | number>(null);
  const [loadingSelectedTemp, setLoadingSelectedTemp] = useState(false)
  const {templates} = app
  
  
  const handleViewTemplate = (index: number) => {
    setViewingTemp(index)
  }

  const handleBackToAllTemps = () => {
    setViewingTemp(null)
  }

  const handleSelectTemplate = async (index: number) => {
    // const markdown = {
    //   content: templates[_template].content,
    //   currentLine: templates[_template].content.split("\n").length
    // }

    // dispatch(appActions.changeMarkdown(markdown))

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


    
    getTemplates()
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
            mb: {md: 8},
            textAlign:{xs: "center", md: "left"}
            }}>Select a<br />template.</Typography>
          </Box>


          
        </Grid>

        <Grid item xs={12} md={8} sx={{
          height: {xs: "auto", md: "100%"}
        }}>
          <Box sx={{
            height: {xs: "auto", md: "100%"},
            // border: "1px solid blue",
            // display: "flex",
            py: 4,
            px: {xs: "16px", md: "24px"}
          }}>
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

