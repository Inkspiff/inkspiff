import React, {useState} from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
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
import ChooseSections from "./choose-sections"
import AddContact from "./add-contact"
import { useRouter } from "next/router"
import { useSession, signIn, signOut } from "next-auth/react";



const UseAIForm = () => {
  const { data: session } = useSession();
  const router = useRouter()
    const dispatch = useDispatch()
    const app = useSelector((state: RootState) => state.app)
    const {markdown} = app

    const [description, setDescription] = useState<string>("")
    const [projectType, setProjectType] = useState<number>(0);
    const [illustrationImages, setIllustrationImages] = useState<string[]>([])
    const [isOpenSource, setIsOpenSource] = useState<boolean>(false);
    const [license, setLicense] = useState<number>(0);
    const [contributors, setContributors] = useState<ContributorType[]>([])
    const [projectLink, setProjectLink] = useState<string>("")
    const [sections, setSections] = useState<string[]>([]);
    const [contactInfo, setContactInfo] = useState<string>("")

    const [loadingGeneration, setLoadingGeneration] = useState(false)



    const handleChangeDescription = (event: any) => {
        setDescription(event.target.value)
        
    }

  const handleChangeProjectType = (event: any) => {
    setProjectType(event.target.value);
  };


  const handleChangeOpenSource = () => {
    setIsOpenSource(prev => !prev)
  }

  const handleChangeLicense = (event: any) => {
    setLicense(event.target.value);
  };



  const handleChangeProjectLink = (event: any) => {
    setProjectLink(event.target.value)
  }

  
  const handleUpdateSections = (sections: string[]) => {

  }

  const handleUpdateContributors = (contributors: ContributorType[]) => {

  }

  const handleUpdateImages = (images: string[]) => {

  }

  const handleUpdateContact = (contact: string) => {

}

  
    async function onSubmit(event: any) {

        setLoadingGeneration(true)
        
        const dataSent = {
            description: description,
            projectType,
            screenshots: illustrationImages,
            isOpenSource,
            projectLink,
            contributors,
            sections,
            contactInfo,
        }

        console.log(dataSent)
      event.preventDefault();
      try {
        console.log("trying")
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataSent),
        });
  
        const data = await response.json();
        if (response.status !== 200) {
          throw data.error || new Error(`Request failed with status ${response.status}`);
        }
  
        console.log(data.result)

        const newMdData = {
          title: "New Markdown",
          content: data.result,
          creator: session!.user,
        }
    
         const response2 = await fetch("/api/db/create-md", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newMdData)
          })
        
        setLoadingGeneration(false)

        if (!response2?.ok) {
            // handle wahalas
            return
        } 

          const json = await response2.json()
          router.push(`/editor/${newMdData.title.trim().split(" ").filter(a => a !== " ").join("-")}-${json.id}`)
        
        
      } catch(error: any) {
        // Consider implementing your own error handling logic here
        setLoadingGeneration(false)
        console.error(error);
        alert(error.message);
      }
    }

    return <Paper sx={{
        // border: "1px solid blue",
        height: "100%",
        maxWidth: {xs: "100%", md: "600px"},
        p: 2,
        overflowY: "auto",
        borderRadius: "8px",
      }} elevation={3}>

        

        <Box sx={{
          overflow: "auto"
        }}>
            <TextField
            label={"Description"}
        fullWidth
        multiline
        variant="standard"
        onChange={handleChangeDescription}
        value={description}
        placeholder={"Inspill is a platform to create markdown ..."}
        sx={{
          mb: 2
        }}
    />


    <Box sx={{
      mb: 2,
      
    }}>
    <FormControl sx={{  minWidth: 120 , mr: 2}} size="small" variant="standard">
      <InputLabel id="demo-select-small">Type</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={projectType}
        label="Project Type"
        onChange={handleChangeProjectType}
      >
        <MenuItem value={0}>
          <em>None</em>
        </MenuItem>
        {README_TYPES_DATA.map((type, index) => {
            return <MenuItem key={index} value={index + 1}>{type}</MenuItem>
        })}
    
      </Select>
    </FormControl>

    {/* <AddDemoImage onUpdateImages={handleUpdateImages} /> */}
    

<FormControl sx={{  minWidth: 120 }} size="small" variant="standard">
      <InputLabel id="demo-select-small">License</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={license}
        label="License"
        onChange={handleChangeLicense}
      >
       {README_LICENSE_DATA.map((lic, index) => {
        return <MenuItem key={index} value={index}>{lic.acronym}</MenuItem>
       })}
      </Select>
    </FormControl>

    
    </Box>
      
      <FormControlLabel control={<Checkbox
         checked={isOpenSource}
         onChange={handleChangeOpenSource}
         inputProps={{ 'aria-label': 'Open Source' }}
         
      />} label="Open source" sx={{
        // border: "1px solid red",
        mb: 2,
       }}/>

    
    {isOpenSource && <AddContributors onUpdateContributors={handleUpdateContributors} />}

    {/* <TextField 
            fullWidth
            maxRows={1}
            onChange={handleChangeProjectLink}
            value={projectLink}
            placeholder={"Project Link"}
        /> */}

       {/* <AddContact onUpdateContact={handleUpdateContact} /> */}

        <ChooseSections onUpdateSections={handleUpdateSections} />

        

        </Box>

      <Grid container item sx={{
        justifyContent: "flex-end",
      }}>
        <LoadingButton loading={loadingGeneration} 
         startIcon={<SaveIcon />}  
         
         loadingIndicator="Generating" 
         onClick={onSubmit} variant={"contained"} sx={{
          my: 2,
        }}>Generate</LoadingButton>
      </Grid>
    
      </Paper>
}

export default UseAIForm
