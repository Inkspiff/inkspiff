import React, {useState, useEffect, useContext} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import NameEmail from "@/components/account/NameEmail"
import Input from '@mui/material/Input';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import ViewTemplateInEditor from "@/components/templates/ViewTemplateInEditor"
import TemplateFilterSelect from "@/components/templates/TemplateFilterSelect"
import { ThemeContext } from '@/context/ThemeContext';
import TemplatesList from "@/components/templates/TemplatesList";
import { matchSorter } from "match-sorter";
import { TemplateType } from '@/types';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  height: "80%",
  bgcolor: 'background.paper',
//   border: '2px solid #000',
  borderRadius: "8px",
//   boxShadow: 24,
  p: 0,
  overflow: "hidden",
};

const TEMPLATE_CATEGORIES = [
    "profile",
    "website",
    "blog",
    "package",
]

interface propTypes {
    open: boolean;
    onClose: () => void
}

export default function TemplatesPopup({open, onClose}: propTypes) {
    const dispatch = useDispatch()
  const { data: session } = useSession();
  const app = useSelector((state: RootState) => state.app)
  const { toggleTheme, theme} = useContext(ThemeContext);

  const [space, setSpace] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState<string>("")
  const [searchResults, setSearchResults] = useState<TemplateType[]>([])
  const [categories, setCategories] = useState<string[]>([])
  
  const {palette, } = theme
  const {mode } = palette
  const { templates } = app

  const handleClose = () => onClose();

  const handleSelectCategory = (index: number) => {
    setSearchValue(TEMPLATE_CATEGORIES[index])
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

    if (templates.length === 0) {
      console.log("grabbing templates")
      getTemplates()
    }
  }, [templates])

  // console.log(templates)


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
      if (searchValue) {
        const matchedTemplates = matchSorter(templates, searchValue, { keys: ["categories"] });
      setSearchResults(matchedTemplates);
      }
      
  }, [searchValue]);

  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Paper sx={style}>
          <Grid container sx={{
            height: "100%",
          }} spacing={0} >
            <Grid item sm={4} sx={{
                height: "100%",
                bgcolor: (mode === "light") ? "rgb(251, 251, 250)" : "rgb(28, 28, 28)",
                m: 0,
                py: 2, 
                
            }}>
            <Box sx={{
              px: 2,
              mb: 2
            }}>
              <Typography variant="body1" component="h3" sx={{
                fontWeight: 700,
                mb: 1,
              }}>Templates</Typography>
  
              {/* <TemplateFilterSelect /> */}
              <Input 
                fullWidth
                value={searchValue} 
                placeholder={"Search..."}
                startAdornment={<SearchOutlinedIcon />}
                onChange={handleSearchChange}
                type="text"
                />

               
            </Box>

              <Box>
                <Typography variant="body2" component="h4" sx={{
                  px: 2,
                  mb: 1
                }}> Suggestions</Typography>
                 <List>
                {TEMPLATE_CATEGORIES.map((category, index) => {
                    return <ListItem key={index} sx={{
                      // border: "1px solid red",
                      p: 0,
                      m: 0,
                      px: "4px",
                    }}>
                        <ListItemButton sx={{
                          // border: "1px solid blue",
                          p: "2px 12px",
                          m: 0,
                          borderRadius: "6px",
                        }} onClick={() => {handleSelectCategory(index)}}>
                          <ListItemText primary={<Typography variant="body2" sx={{
                            // border: "1px solid red",
                            p: 0,
                            m: 0,
                            textTransform: "capitalize",
                          }}>{category}</Typography>} />
                        </ListItemButton>
                     
                    </ListItem>
                })}
                
                </List>
              </Box>
            
                
            </Grid>
            <Grid item sm={8} sx={{
                 height: "100%",
                 
                //  border: "1px solid blue",
            }}>
                <Box sx={{
                    height: "100%",
                    //  border: "1px solid blue",
                }}>
                  {searchValue ? <Box sx={{
                    px: 2,
                    py: 2,
                    height: "100%",
                    overflowY: "auto",
                  }}>
                    <TemplatesList templates={searchResults} />
                  </Box> : <ViewTemplateInEditor template={templates[0]} onClose={onClose} /> 
                  
                  }
                </Box>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </>
  );
}