import React, {useContext} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { useSession } from "next-auth/react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ThemeToggler from "@/components/appearance/ThemeToggler"
import Logo from "@/components/ui/Logo"
import Navbar from "@/components/layout/Navbar"
import NavDrawer from "@/components/layout/NavDrawer"
import { ThemeContext } from '@/context/ThemeContext';

const HomeHeader = () => {
  const { toggleTheme, theme} = useContext(ThemeContext);

  const {palette, } = theme
  const {mode } = palette
  


  return (
    <AppBar
      sx={{
        border: "none",
        bgcolor: "transparent"
      }}
      elevation={0}
      variant="outlined"
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: '100%',
          bgcolor: mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(18, 18, 18, 0.9)',
          backdropFilter: 'saturate(180%) blur(20px)',
          
        }}
      >
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        }}>
          <Link href={"/"}>
          <Logo type="both" size={30} sx={{
            mr: 1,
            cursor: "pointer"
          }} />
          </Link>
          

         <Navbar />

        
        </Box>

        <Box>
        

          <ThemeToggler />
          <NavDrawer />
        </Box>
        
      </Toolbar>
      <Divider sx={{
        mx: 2
      }} />
      
      
    </AppBar>
  )
}

export default HomeHeader