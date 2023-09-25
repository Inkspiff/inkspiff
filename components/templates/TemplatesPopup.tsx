import React, {useState, useEffect} from 'react';
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
import General from '@/components/settings/General';
import NotificationSettings from '@/components/settings/NotificationSettings';
import Billing from '@/components/settings/Billing';
import Members from '@/components/settings/Members';
import Plans from "@/components/plans/Plans"
import Input from '@mui/material/Input';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import ViewTemplateInEditor from "@/components/templates/ViewTemplateInEditor"
import TemplateFilterSelect from "@/components/templates/TemplateFilterSelect"

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

const SIDE_LIST = [
    {
        text: "General",
        icon: <TuneRoundedIcon sx={{
          fontSize: "16px",
          m: 0,
        }}/>,
    },
    {
        text: "Notifications",
        icon: <NotificationAddOutlinedIcon sx={{
          fontSize: "16px",
          m: 0,
        }}/>,
    },
    {
        text: "Members",
        icon: <PeopleAltOutlinedIcon sx={{
          fontSize: "16px",
          m: 0,
        }}/>,
    },
    {
        text: "Billing",
        icon: <CreditCardOutlinedIcon sx={{
          fontSize: "16px",
          m: 0,
        }}/>,
    },
    {
        text: "Upgrade",
        icon: <ArrowCircleUpOutlinedIcon sx={{
          fontSize: "16px",
          m: 0,
        }}/>,
    },
]

interface propTypes {
    open: boolean;
    onClose: () => void
}

export default function TemplatesPopup({open, onClose}: propTypes) {
    const dispatch = useDispatch()
  const { data: session } = useSession();
  const app = useSelector((state: RootState) => state.app)
  
  const [value, setValue] = React.useState<string>("")

  const { templates } = app

  const handleClose = () => onClose();

  const [space, setSpace] = useState<number>(0)
  const [loading, setLoading] = useState(false)

  const handleSelectSpace = (index: number) => {
    setSpace(index)
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
                bgcolor: "rgb(251, 251, 250)",
                // border: "1px solid red",
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
  
              <TemplateFilterSelect />
              <Input 
                fullWidth
                value={value} 
                placeholder={"Search..."}
                startAdornment={<SearchOutlinedIcon />}
                
                type="text"

                />

               
            </Box>

              <Box>
                <Typography variant="body2" component="h4" sx={{
                  px: 2,
                  mb: 1
                }}> Suggestions</Typography>
                 <List>
                {SIDE_LIST.map((elem, index) => {
                  if (!session) {
                    if (elem.text === "Billing") {
                      return 
                    }
                  }
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
                      bgcolor: (index === space) ? "grey.A100" : "",
                    }} onClick={() => {handleSelectSpace(index)}}>
                            <ListItemIcon sx={{
                      
                      minWidth: "0",
                      fontWeight: 300,
                      mr: "8px",

                            }}>{elem.icon}</ListItemIcon>
                            <ListItemText primary={<Typography variant="body2" sx={{
                      // border: "1px solid red",
                      p: 0,
                      m: 0,
                      // fontSize: "12px",
                    }}>{elem.text}</Typography>} />
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
                }}>
                    { (templates.length > 0) 
                    ? <ViewTemplateInEditor template={templates[0]} /> 
                    : <Box> No Templates </Box>}
                </Box>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </>
  );
}