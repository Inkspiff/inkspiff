import React, {useState} from "react";
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

const HomeHeader = () => {
  
  const { data: session } = useSession()

  const router = useRouter()

  const handleCreateNew = () => {
    router.push("/create-new")
  }


  return (
    <AppBar
      sx={{
        border: "none",
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
        }}
      >
        <Box sx={{
            display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <Logo type="both" size={30} sx={{
            mr: 1,
          }} />

         <Navbar />
        </Box>

        <Box>
        {!session && <Button variant="text" sx={{
            display: {xs: "none", sm: "inline-flex" },
            mr: 1,
          }} size="small">
            <Link href="/login">Log in</Link>
          </Button>}
          <Button variant="contained" onClick={handleCreateNew} sx={{
            display: {xs: "none", sm: "inline-flex" },
            mr: 1,
          }} size="small">Create new .md</Button>
          {/* <NavDrawer /> */}

          <ThemeToggler />
        </Box>
        
      </Toolbar>
      <Divider sx={{
        mx: 2
      }} />
      
      
    </AppBar>
  )
}

export default HomeHeader