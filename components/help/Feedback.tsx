import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from '@/store/app-slice';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router"
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined"
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined"


export default function Share() {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)

  const [invitee, setInvitee] = useState<string>("")
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'share-popover' : undefined;


  const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setInvitee(e.currentTarget.value)
  }

  const handleSendFeedback = () => {

  }


  return (
    <>
       <Paper variant="outlined" elevation={0} sx={{
              borderRadius: "50%",
              height: "45px",
              width: "45px",
              position: "fixed",
              bottom: "2rem",
              right: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": {
                bgcolor: "action.hover"
              }
            }}   onClick={handleClick}>
              ?
              </Paper>

        <Menu 
        id="feedback-menu"
        open={open} 
        anchorEl={anchorEl}
        onClose={handleClick}
        MenuListProps={{
        'aria-labelledby': 'feedback-button',
        }}
        sx={{
            mb: 2,
            "& .MuiMenu-paper": {
                // width: "240px",
                maxWidth: "100%",
                p: 0,
                py: 1,
                px: 0,
                mb: 2,
            }
        }}
        transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        anchorOrigin={{
         vertical: 'top',
         horizontal: 'center',
       }}
        >
           
            <MenuItem onClick={handleSendFeedback} sx={{
                borderRadius: "4px",
                padding: "4px 16px"
            }}>
                <ListItemIcon  sx={{
                    border: "1px solid blue",
                    mr: 1,
                    minWidth: "0",
                }}>
                    <FeedbackOutlinedIcon sx={{
                        fontSize: "18px",
                        border: "1px solid red",
                        mr: 0
                    }} />
                </ListItemIcon>
                <ListItemText primary={<Typography sx={{
                fontSize: "14px",
                mb: 0
                }}>Send us feedback</Typography>}></ListItemText>
            
            </MenuItem>

             <MenuItem onClick={handleSendFeedback} sx={{
                borderRadius: "4px",
                padding: "4px 16px"
            }}>
                <ListItemIcon>
                    <MessageOutlinedIcon sx={{
                        fontSize: "18px",
                        border: "1px solid red"
                    }} />
                </ListItemIcon>
                <ListItemText primary={<Typography sx={{
                fontSize: "14px",
                mb: 0
                }}>Message support</Typography>}></ListItemText>
            
            </MenuItem>

            <Divider sx={{
                mb: 1,
                width: "100%",
            }}/>

            <MenuItem onClick={handleSendFeedback} sx={{
                borderRadius: "4px",
                padding: "4px 16px"
            }}>
                <ListItemText primary={<Typography sx={{
                fontSize: "14px",
                mb: 0
                }}>How to use Inkspiff</Typography>}></ListItemText>
            
            </MenuItem>
            <MenuItem onClick={handleSendFeedback} sx={{
                borderRadius: "4px",
                padding: "4px 16px",
            }}>
                <ListItemText primary={<Typography sx={{
                fontSize: "14px",
                mb: 0
                }}>What&apos;s new?</Typography>}></ListItemText>
            
            </MenuItem>

            <Divider sx={{
                mb: 1,
                width: "100%",
            }} />

            <MenuItem onClick={handleSendFeedback} sx={{
                borderRadius: "4px",
                padding: "4px 16px"
            }}>
                <ListItemText primary={<Typography sx={{
                fontSize: "12px",
                mb: 0
                }}>Twitter @Inkspiff</Typography>}></ListItemText>
            
            </MenuItem>
            <MenuItem onClick={handleSendFeedback} sx={{
                borderRadius: "4px",
                padding: "4px 16px",
            }}>
                <ListItemText primary={<Typography sx={{
                fontSize: "12px",
                mb: 0
                }}>Terms & privacy</Typography>}></ListItemText>
            
            </MenuItem>
            <MenuItem onClick={handleSendFeedback} sx={{
                borderRadius: "4px",
                padding: "4px 16px",
            }}>
                <ListItemText primary={<Typography sx={{
                fontSize: "12px",
                mb: 0
                }}>Status</Typography>}></ListItemText>
            
            </MenuItem>

            <Divider sx={{
                mb: 1,
                width: "100%",
            }} />

            <Box sx={{
                px: 2
             }}>
                <Typography sx={{
                fontSize: "12px",
                mb: 0
                }}>Inkspiff</Typography>
                <Typography sx={{
                    fontSize: "12px",
                    mb: 0
                    }}>Updated minutes ago</Typography>
                 </Box>        
      </Menu>
    </>
  );
}