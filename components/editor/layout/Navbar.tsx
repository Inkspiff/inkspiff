import React, {useState} from "react";
import Image from "next/image";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar"
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import Logo from "@/components/ui/Logo"
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import TitleSpace from "@/components/editor/TitleSpace";
import VerticalSplitRoundedIcon from '@mui/icons-material/VerticalSplitRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import RightSidePanel from "@/components/editor/layout/RightSidePanel"
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import IconButton from "@mui/material/IconButton";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import VerticalSplitOutlinedIcon from '@mui/icons-material/VerticalSplitOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
// import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import More from "@/components/editor/layout/More";
import Share from "@/components/editor/Share"
import { AiFillGithub } from "react-icons/ai";
import GithubPopup from "../popups/GithubPopup";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));




const Navbar = () => {

  const { data: session } = useSession()
  const dispatch = useDispatch()
  
  const app = useSelector((state: RootState) => state.app);
  const { markdown, viewSettings, saveStates} = app;

  const {drawer: open} = viewSettings

  const {saving, saveFailed} = saveStates

  const [copied, setCopied] = useState<boolean>(false);
  const [moreAnchorEl, setMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  

  const handleOpenMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMoreAnchorEl(event.currentTarget);
  };
  const handleCloseMore = () => {
    setMoreAnchorEl(null);
  };


const handleCopy = () => {
      navigator.clipboard.writeText(markdown.content);
        setCopied(true)

        setTimeout(() => {
                  setCopied(false)
        }, 3000);
  }

  const handleGithub = () => {
    dispatch(appActions.setPopup("github"))
  }

const handleOpenDrawer = () => {
  dispatch(appActions.openDrawer())
}


const handleToggleFullscreen = () => {
  dispatch(appActions.toggleFullscreen())
}

const handleShowSidebar = () => {
  dispatch(appActions.toggleSidebar())
}

  return (
    <AppBar
      
      elevation={0}
      variant="outlined"

      open={open}
      sx={{
        height: "45px",
        position: "fixed",
        top: 0,
        left: 0,
        borderWidth: "0 0 1px 0",
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: '100%',
          height: "100%",
          px: 2,
          py: 0,
        }}
      >
        
        <Box sx={{
            display: "flex",
            alignItems: "center",
            // color: "#121212"
        }}>
          {!open && <IconButton sx={{
            display: {xs: "inline-flex"},
            borderRadius: "4px",
          
          }} onClick={handleOpenDrawer} size="small">
            <MenuRoundedIcon />
          </IconButton>}
          {/* <Logo /> */}

          <TitleSpace  />
          {saving && <Typography variant="caption">Saving...</Typography>}
          {saveFailed && <Typography variant="caption">Saving Failed</Typography>}
        </Box>
          
          
        <Box sx={{
           display: "flex",
           alignItems: "center",
           justifyContent: "space-between",
          
        }}>

          
          {/* <Button variant="contained" onClick={handleCopy} disabled={copied}>{copied ? "COPIED" : "COPY README"}</Button> */}
          <Stack direction="row" spacing={1} sx={{
       
            // border: "1px solid red",
            alignItems: "center",
          }}>

            <IconButton sx={{
              borderRadius: "4px"
            }}  size="small" onClick={handleGithub}>
           <AiFillGithub style={{
                // color: "#121212",
                fontSize: "18px"
              }} />
            </IconButton>

            <GithubPopup />

            
            <IconButton sx={{
              borderRadius: "4px"
            }}  size="small" onClick={handleCopy}>
            {copied ? <DoneOutlineRoundedIcon sx={{
                // color: "#121212",
                fontSize: "18px"
              }} /> : <ContentCopyOutlinedIcon sx={{
                // color: "#121212",
                fontSize: "18px"
              }} />}
            </IconButton>

            {/* <IconButton sx={{
              borderRadius: "4px"
            }}  size="small" onClick={handleCopy}>
            <VisibilityOutlinedIcon sx={{
                color: "#121212",
                fontSize: "18px"
              }} />
            </IconButton> */}

             
            
            <Share />


              <Box sx={{
                display: {xs: "none", md: "inline-block"}
              }}>
              {viewSettings.fullscreen ? 
              <IconButton sx={{
                borderRadius: "4px"
              }} onClick={handleToggleFullscreen} size="small">
                <ArticleOutlinedIcon sx={{
                  // color: "#121212"
                }}  />
              </IconButton> : 
              <IconButton sx={{
                borderRadius: "4px"
              }} onClick={handleToggleFullscreen} size="small">
                <VerticalSplitOutlinedIcon sx={{
                // color: "#121212"
              }} />
              </IconButton> 
              }
              </Box>
              
              
              <RightSidePanel />


              <More />
    </Stack>


            
         
        </Box>
      </Box>
    </AppBar>
  );
};

export default Navbar;
