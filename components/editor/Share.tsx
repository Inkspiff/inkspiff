import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from '@/store/app-slice';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router"
import { IoIosLink } from "react-icons/io";
import { MembersType } from '@/types';
import { EMAIL_PATTERN } from '@/lib/utils';4

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Share() {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)

  const [memberEmail, setMemberEmail] = useState<string>("")
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [addingMmeber, setAddingMember] = useState<boolean>(false)
  const [gettingFileMembers, setGettingFileMembers] = useState<boolean>(false)
  const [searchResultFromDB, setSearchResultFromDB] = useState<MembersType | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'share-popover' : undefined;

  const {markdown, markdownSelected} = app

  const [visibilityOptionsAnchorEl, setVisibilityOptionsAnchorEl] = React.useState<null | HTMLElement>(null);
  const openVisisbilityOptions = Boolean(visibilityOptionsAnchorEl);
  const handleOpenVisibilityOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setVisibilityOptionsAnchorEl(event.currentTarget);
  };
  const handleCloseVisibilityOptions = () => {
    setVisibilityOptionsAnchorEl(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setMemberEmail(e.currentTarget.value)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://inkspiff.com/${markdown.title.trim().split(" ").join("-")}-${markdown.id}`)
  }

  const handleChangeVisibility = (vis: string) => { 
    console.log("change visibility", vis)
  }

  useEffect(() => {
    const handleCheckIfUser = async () => {
      console.log({memberEmail})
      const response = await fetch("/api/db/get-user-from-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: memberEmail,
        })
      })
  
      if (!response?.ok) {
        if (response.status === 402) {
          return 
        }
        setSearchResultFromDB(null)
        return 
      }
  
      const member = await response.json()
      setSearchResultFromDB(member)
      console.log({member})
    }
    if (EMAIL_PATTERN.test(memberEmail)) { // TODO: check if valid
      handleCheckIfUser()
    }
  }, [memberEmail])


  const handleAddMember = async () => {
    if (searchResultFromDB === null) {
      // TODO: send invite email
      return
      
    }

    setAddingMember(true)
    const response = await fetch("/api/db/add-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // userId: session!.user.id,
        memberID: searchResultFromDB.id,
        memberEmail: searchResultFromDB.email,
        memberAccess: "edit",
        mdID: markdownSelected,
      })
    })

    setAddingMember(false)

    if (!response?.ok) {
      if (response.status === 402) {
        return 
      }
      return
    }
  }


  useEffect(() => {

    const getMembersOfFileOpened = async () => {
      setGettingFileMembers(true)
      const response = await fetch("/api/db/get-members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // userId: session!.user.id,
          mdID: markdownSelected,
        })
      })


      setGettingFileMembers(false)

      if (!response?.ok) {
        if (response.status === 402) {
          return 
        }
        return
      }

      const json = await response.json()
      console.log({json})
    }

    if (markdownSelected && session) {
      getMembersOfFileOpened()
    }

  }, [setAddingMember])

  return (
    <>
       <IconButton sx={{
              borderRadius: "4px"
            }}  size="small" onClick={handleClick}>
              <ShareOutlinedIcon sx={{
                // color: "#121212"
              }}/>
              </IconButton>
      <Popover id={id} open={open} anchorEl={anchorEl}
       onClose={handleClick}
       anchorOrigin={{
         vertical: 'bottom',
         horizontal: 'left',
       }}
      >

        <Paper sx={{
             bgcolor: 'background.paper',
             maxWidth: "100%",
             width: {xs: "400px", md: "400px"},
             border: "1px solid transparent",
             }} >
             
            <Typography variant="body1" component="h2" sx={{
          fontWeight: 700,
          my: 1,
          mx: 2,
        }}>Share</Typography>
        <Divider sx={{
          my: 0,
        }}/>
          {session ?  
            <>
               <Box sx={{
            px: "8px",
            my: 1,
            // border: "1px solid red",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
              <Box component="input" value={memberEmail} onChange={handleChange} sx={{
                border: "1px solid",
                borderColor: "grey.A200",
                p: "8px 8px",
                width: "calc(100% - 72px)",
                lineHeight: "16px",
                fontSize: "16px",
                borderRadius: "4px",
                mr: 1,
              }} />
                <Button variant="contained" size="small" onClick={handleAddMember}>invite</Button>
              </Box>

              <Divider sx={{
                my: 1,
              }}/>

              <Box 
                sx={{
                  px: 2,
                  mb: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
        
                <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleOpenVisibilityOptions}
                >
                  Anyone with the link
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={visibilityOptionsAnchorEl}
                  open={open}
                  onClose={handleCloseVisibilityOptions}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => handleChangeVisibility("private")}>edit</MenuItem>
                  <MenuItem onClick={() => handleChangeVisibility("public")}>view</MenuItem>
                </Menu>
                </div>

                <Button variant="text" size="small" sx={{
                  display: "flex",
                alignItems: "center",
                }} onClick={handleCopyLink}> 
                    <IoIosLink style={{
                      marginRight: "4px"
                    }} />Copy Link
                </Button>
              </Box>   
            </>    
          : 
            <Box sx={{
              px: "8px",
              my: 1,
            }}>
              <Typography variant="body2" sx={{}}>Please login to create file links for free.</Typography>
              <Typography variant="body2" sx={{}}>Login</Typography>
            </Box>
          }
           
        </Paper>
      </Popover>
    </>
  );
}