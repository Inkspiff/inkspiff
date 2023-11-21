import React from "react"
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Divider from "@mui/material/Divider"
import Input from "@mui/material/Input"
import IconButton from "@mui/material/IconButton"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import { SectionType } from "@/types/editor";
import {SUPPORTED_SECTIONS} from "@/config/editor"
import {splitIntoSections, uid} from "@/lib/utils"
import { matchSorter } from "match-sorter";
import Modal from '@mui/material/Modal';
import CustomSectionNamer from "@/components/editor/CustomSectionNamer"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

const Sections = () => {
    const { data: session } = useSession()
    const dispatch = useDispatch()
    const app = useSelector((state: RootState) => state.app);

    const { markdown, viewSettings, saveStates, selectedSection, addedSections} = app;
    const {content: mainContent} = markdown
    const {drawer, sidebar} = viewSettings
    const [searchValue, setSearchValue] = React.useState<string>("")
    const [sectionItems, setSectionItems] = React.useState<{name: string, content: string}[]>(SUPPORTED_SECTIONS)
    const [openCustomSectionNamer, setOpenCustomSectionNamer] = React.useState(false)
    const [showAddedSections, setShowAddedSections] = React.useState(false)
    const [showAvailableSections, setShowAvailableSections] = React.useState(false) 

    const handleOpenCustomSectionNamer = () => {
        setOpenCustomSectionNamer(true)
    }
    const handleCloseCustomSectionNamer = () => {
        setOpenCustomSectionNamer(false)
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setSearchValue(e.target.value)
    }
  

    React.useEffect(() => {
        if (sidebar) {
            dispatch(appActions.addSections(splitIntoSections(mainContent)))
        }
    }, [sidebar])


    React.useEffect(() => {
        const matchedItems = matchSorter(SUPPORTED_SECTIONS, searchValue.trim(), { keys: ["name"] });
        setSectionItems(matchedItems);
      }, [searchValue]);
    

    React.useEffect(() => {
        
        if (sidebar) { 
            dispatch(appActions.updateMarkdownContent(
                addedSections.map(section => section.content).join("")
            ))
        }
    }, [addedSections])

    

    const handleAddSection = (section: {name: string, content: string}) => {
        const newSection = {
            id: uid(),
            name: section.name,
            content: section.content,
        }
        // dispatch(appActions.selectSection(section))
        dispatch(appActions.addSection(newSection))
    }

    const handleRemoveSection = (id: string, index: number ) => {

        console.log("Remove Section: ", id)
        dispatch(appActions.removeSection({id: id}))

        let nextSelectedSectionIndex = 0
        
        if (index === (addedSections.length - 1)) { // if last section
            nextSelectedSectionIndex = index - 1
        } else {
            nextSelectedSectionIndex = index + 1
        }
        

        setTimeout(() => {
            if (addedSections.length > 0) { // more than one section
                dispatch(appActions.selectSection(addedSections[nextSelectedSectionIndex]))
            } else {
                dispatch(appActions.selectSection(null))
            }
        }, 0)
        
    }

    const handleSelectSection = (section: SectionType) => {
        console.log("selected: ", section.id)
        dispatch(appActions.selectSection(section))
    }


    const handleToggleShowAddedSections = () => {
        setShowAddedSections(prev => !prev)
    }
    

   


    return <Box sx={{
        overflowY: "auto",
        height: "100%",
        p: "8px",
        pb: 4,
    }}>
        <Typography variant="body2" component="h2" sx={{
            fontWeight: 700,
            mb: 2,
        }}>Sections</Typography>
        <Box sx={{
            mb: 2,
        }}>
            <Box sx={{
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "space-between",
                     mb: 1,
                }}>
            <Typography variant="caption" sx={{
                }}>Added Sections</Typography>
                <IconButton size="small" sx={{
                        borderRadius: "4px"
                    }} onClick={handleToggleShowAddedSections}>
                    {showAddedSections ? <ExpandLessRoundedIcon />  : <ExpandMoreRoundedIcon /> }
                </IconButton>
            </Box>
        
            <Box sx={{
                display: showAddedSections ? "auto" : "none"
            }}>
            {addedSections.map((section, index) => {
            return <Paper key={index}  sx={{
                p: "4px 8px",
                mb: 1,
                textAlign: "center",
                borderRadius: "6px",
                cursor: "pointer",
                border: "2px solid",
                borderColor: selectedSection?.id.trim() === section.id.trim() ? "info.main" : "transparent",
                "&:hover": {
                    borderColor: "info.main"
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                
            }} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                console.log("get in")
                e.stopPropagation()
                handleSelectSection(section)
                }}>
                    {section.name}

                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                    }}>
                        <IconButton size="small" sx={{
                            borderRadius: "4px"
                        }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            console.log("get out")
                            e.stopPropagation()
                            handleRemoveSection(section.id, index)
                        }}
                        >
                            <DeleteOutlineOutlinedIcon 
                            sx={{
                                fontSize: "20px",
                            }} />
                        </IconButton>
                    </Box>
                    </Paper>
                })}
            </Box>
        
        </Box>

        <Divider sx={{
            mb: 2,
        }} />

        <Box>
        

        <Input 
        value={searchValue} 
        placeholder={"Search..."}
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
        type="search"
        onChange={handleSearchChange}
        />

        <Box sx={{
                mb: 2
            }}>
            <Typography variant="caption" >
                Available Sections
            </Typography>
        </Box>
        

        <Paper sx={{
            p: "4px 8px",
            mb: 1,
            textAlign: "center",
            borderRadius: "6px",
            cursor: "pointer",
            border: "2px solid",
            borderColor: "transparent",
            "&:hover": {
                borderColor: "info.main"
            },
        }} onClick={handleOpenCustomSectionNamer}> + Custom section</Paper>
        
        {sectionItems.map((section, index) => {
            return <Paper key={index}  sx={{
                p: "4px 8px",
                mb: 1,
                textAlign: "center",
                borderRadius: "6px",
                cursor: "pointer",
                border: "2px solid",
                borderColor: "transparent",
                "&:hover": {
                    borderColor: "info.main"
                },
            }} onClick={() => {handleAddSection(section)}}>
                {section.name}
                </Paper>
        })}

        </Box>
        <Modal
        open={openCustomSectionNamer}
        onClose={handleCloseCustomSectionNamer}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ {
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        }}>
            <CustomSectionNamer />
        </Box>
      </Modal>
    </Box>
}

export default Sections