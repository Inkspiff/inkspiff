import React, {useState, useEffect, use} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from '@/store/app-slice';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router"
import DoneIcon from '@mui/icons-material/Done';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface ShareProps {
    open: boolean;
}

export default function VisibilityChange({open}: ShareProps) {
  const router = useRouter();
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)

  const [visibilityOptionsAnchorEl, setVisibilityOptionsAnchorEl] = React.useState<null | HTMLElement>(null);
  const [changingVisibility, setChangingVisibility] = useState<boolean>(false)
  
  
  const {markdown, markdownSelected} = app
  const {visibility} = markdown

  const openVisisbilityOptions = Boolean(visibilityOptionsAnchorEl);
  const idOfVisibilityOptions = openVisisbilityOptions ? 'members-menu' : undefined;

 
  const handleOpenVisibilityOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setVisibilityOptionsAnchorEl(event.currentTarget);
  };
  const handleCloseVisibilityOptions = () => {
    setVisibilityOptionsAnchorEl(null);
  };


  const handleChangeVisibility = async (vis: string) => {
    setChangingVisibility(true)
    const response = await fetch("/api/db/change-visibility", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mdId: markdownSelected,
        visibility: vis,
      })
    })

    setChangingVisibility(false)

    if (!response?.ok) {
        console.log("here")
      if (response.status === 402) {
        console.log("here 2")
        return 
      }
      return
    }

    dispatch(appActions.changeVisibility(vis))
  }


  return (
        <div>
            <Button
                id="basic-button"
                aria-controls={openVisisbilityOptions ? 'members-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openVisisbilityOptions ? 'true' : undefined}
                onClick={handleOpenVisibilityOptions}
                size="small"
                sx={{
                    fontSize: "14px",
                    px: 1,
                }}
            >
                Anyone with the link
            </Button>
            <Menu
                id={idOfVisibilityOptions}
                anchorEl={visibilityOptionsAnchorEl}
                open={openVisisbilityOptions}
                onClose={handleCloseVisibilityOptions}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
                sx={{
                '& .MuiPaper-root': {
                    width: "300px",
                    py: 0.5,
                },
                '& .MuiMenuItem-root': {
                    px: 1,
                },
                }}
            >     
                <MenuItem onClick={() => handleChangeVisibility("private")} sx={{
                py: "2px",
                display: "flex",
                alignItems: "center",
                }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                }}>
                    <Typography variant="body1" sx={{
                    display: "block",
                    fontWeight: 600,
                }}>Invite only</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{
                    fontSize: "12px",
                    }} >Only people added can open</Typography>
                </Box>
                {((visibility === "private") && !changingVisibility) && <DoneIcon />}
                {(changingVisibility) &&<Skeleton variant="circular" width={30} height={30} />}
                </MenuItem>
                <MenuItem onClick={() => handleChangeVisibility("public")} sx={{
                py: 0.5,
                display: "flex",
                alignItems: "center",
                }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                }}>
                    <Typography variant="body1" sx={{
                    display: "block",
                    fontWeight: 600,
                }}>Anyone with link</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{
                    fontSize: "12px",
                    }}>People with link can access it </Typography>
                </Box>
                {((visibility === "public") && !changingVisibility) && <DoneIcon />}
                {(changingVisibility) &&<Skeleton variant="circular" width={30} height={30} />}
                </MenuItem>
                
            </Menu>
    </div>

               
  );
}