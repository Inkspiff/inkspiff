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

interface UseAIInterface {
  onGetMarkdown: () => void
}

const UseAI = ({onGetMarkdown}: UseAIInterface) => {
    const dispatch = useDispatch()
    const app = useSelector((state: RootState) => state.app)
    const {markdown} = app

    const [description, setDescription] = useState<string>("")
    const [projectType, setProjectType] = useState<number>(0);
    const [illustrationImages, setIllustrationImages] = useState<string[]>([]) 
    const [illustrationImage, setIllustrationImage] = useState<string>("") 
    const [isOpenSource, setIsOpenSource] = useState<boolean>(false);
    const [license, setLicense] = useState<number>(0);
    const [contributors, setContributors] = useState<ContributorType[]>([])
    const [projectLink, setProjectLink] = useState<string>("")
    const [sections, setSections] = useState<string[]>([]);
    const [contactInfo, setContactInfo] = useState<string>("")

    const [contrName, setContrName] = useState<string>("")
    const [contrRole, setContrRole] = useState<string>("")
    const [contrLink, setContrLink] = useState<string>("")

    const [loadingGeneration, setLoadingGeneration] = useState(false)



    const handleChangeDescription = (event: any) => {
        setDescription(event.target.value)
        
    }

  const handleChangeProjectType = (event: any) => {
    setProjectType(event.target.value);
  };

  const handleAddIllustrationImage = () => {
    setIllustrationImages(prev => [...prev, illustrationImage]);
    setIllustrationImage("")
  };

  const handleChangeIllustrationImage = (event: any) => {
    setIllustrationImage(event.target.value);
  };

  const handleChangeOpenSource = () => {
    setIsOpenSource(prev => !prev)
  }

  const handleChangeLicense = (event: any) => {
    setLicense(event.target.value);
  };


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

  const handleChangeProjectLink = (event: any) => {
    setProjectLink(event.target.value)
  }

  const handleChangeContactInfo = (event: any) => {
    setContactInfo(event.target.value)
  }

  const handleAddSection = (index: number) => {
    if (!sections.includes(README_SECTION_DATA[index])) {
        setSections(prev => [...prev, README_SECTION_DATA[index]])
    }
    
  }


  console.log(illustrationImages)
  
    async function onSubmit(event: any) {
        
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
        dispatch(appActions.updateMarkdown({text: data.result}))
      } catch(error: any) {
        // Consider implementing your own error handling logic here
        console.error(error);
        alert(error.message);
      }
    }

    return <Box sx={{
        minHeight: "100%",
        border: "1px solid red",
        p: 2,
    }}>
        <TextField 
        fullWidth
        multiline
        onChange={handleChangeDescription}
        value={description}
        placeholder={"Project Description"}
    />

<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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

    <Box>
        <TextField 
            fullWidth
            maxRows={1}
            onChange={handleChangeIllustrationImage}
            value={illustrationImage}
            placeholder={"Image link"}
        /> 
        <Button onClick={handleAddIllustrationImage}>ADD</Button>
        <Box>
            {illustrationImages.map((img, index) => {
                return <Box key={index}>
                    <Typography >{img}</Typography>
                    </Box>
            })}
        </Box>
    </Box>
    
    {/* <Box sx={{
        border:( isOpenSource && "1px solid blue")
    }}>Open source</Box> */}

<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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

    <TextField 
            fullWidth
            maxRows={1}
            onChange={handleChangeProjectLink}
            value={projectLink}
            placeholder={"Project Link"}
        />

<TextField 
            fullWidth
            maxRows={1}
            onChange={handleChangeContactInfo}
            value={contactInfo}
            placeholder={"ContactInfo"}
        />

        <Box>
            
        
        <Typography>Must Include: </Typography>
        {README_SECTION_DATA.map((section, index) => {
                return <Paper key={index} elevation={2} onClick={() => { handleAddSection(index) }} sx={{
                    bgcolor: sections.includes(section) ? "blue" : "",
                    display: "inline-block",
                    mx: "4px",
                    mb: 1,
                    p: 0.5,
                    px: 1,
                }}>
                    {section}
                </Paper>
            })}
        </Box>

        <FormGroup>
      <FormControlLabel control={<Checkbox
         checked={isOpenSource}
         onChange={handleChangeOpenSource}
         inputProps={{ 'aria-label': 'Open Source' }}
      />} label="Open source" />
    </FormGroup>

    <Button onClick={onSubmit}>Generate</Button>
        </Box>
}

export default UseAI

/**
 * <form onSubmit={onSubmit}>
         
          <input type="submit" value="Generate names" />
        </form>
 */