import React, {useState, useContext} from 'react';
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
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import { ThemeContext } from '@/context/ThemeContext';
import { popupBaseStyle } from '@/config/editor';

const SIDE_LIST = [
    {
        text: "General",
        icon: <TuneRoundedIcon sx={{
          fontSize: "16px",
          m: 0,
        }}/>,
        component: <General />
    },
    {
        text: "Notifications",
        icon: <NotificationAddOutlinedIcon sx={{
          fontSize: "16px",
          m: 0,
        }}/>,
        
        component: <NotificationSettings />
    },
    {
        text: "Members",
        icon: <PeopleAltOutlinedIcon sx={{
          fontSize: "16px",
          m: 0,
        }}/>,
        
        component: <Members />
    },
    {
        text: "Billing",
        icon: <CreditCardOutlinedIcon sx={{
          fontSize: "16px",
          m: 0,
        }}/>,
        
        component: <Billing />
    },
    {
        text: "Upgrade",
        icon: <ArrowCircleUpOutlinedIcon sx={{
          fontSize: "16px",
          m: 0,
        }}/>,
        
        component: <Plans />
    },
]

interface propTypes {
    open: boolean;
    onClose: () => void
}

export default function Settings({open, onClose}: propTypes) {
  const { data: session } = useSession();
  const app = useSelector((state: RootState) => state.app)
  const { toggleTheme, theme} = useContext(ThemeContext);

  const {palette, } = theme
  const {mode } = palette

  const handleClose = () => onClose();

  const [space, setSpace] = useState<number>(0)

  const handleSelectSpace = (index: number) => {
    setSpace(index)
  }

  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Paper sx={popupBaseStyle}>
          <Grid container sx={{
            height: "100%",
          }} spacing={0} >
            <Grid item sm={4} sx={{
                height: "100%",
                bgcolor: ( mode === "light") ? "rgb(251, 251, 250)" : "rgb(28, 28, 28)",
                // border: "1px solid red",
                m: 0,
                py: 2, 
            }}>
            <Box >
              <Typography variant="body2" component="h3" sx={{
                px: 2,
                fontWeight: 500,
                fontSize: "12px",
                mb: 1,
              }}>Settings</Typography>
            <NameEmail />
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
                      bgcolor: (index === space) ? "action.hover" : "",
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
                p: 5,
            }}>
            {SIDE_LIST[space].component}
            </Box>
            

            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </>
  );
}