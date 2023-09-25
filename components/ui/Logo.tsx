import React, {useContext} from 'react'
import Typography from "@mui/material/Typography"
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import { ThemeContext } from '@/context/ThemeContext';
import { SxProps } from "@mui/material";

interface propTypes { 
  type?: 'text' | 'image' | 'both',
  size?: number,
  sx? : SxProps
}

const Logo = ({type="image", size=34, sx={}}: propTypes) => {

  const { theme } = useContext(ThemeContext);

    const {palette} = theme

    const {mode} = palette

    const logoImage = (mode === 'light') ? "/img/logo-black.png" : "/img/logo-white.png"

    switch(type) {
      case 'text':
        return <Typography
        sx={{
          fontWeight: 700,
          fontSize: `${size}`
        }}
      >
        Inkspiff
      </Typography>
      break;
      case 'image':
        return <Box
        sx={{
          position: "relative",
          width: size,
          height: size,
        //   border: "1px solid red",
          "& img": {
            objectFit: "contain",
          },
          ...sx
        }}
      >
        <Image src={logoImage} alt="inkspiff logo" fill
          
          sizes={`(max-width: 2000px) ${size}`}
        />
      </Box>
      break;
      case 'both':
        return <Box sx={{
          display: "flex",
          alignItems: "center",
        }}>
            <Box
            sx={{
              position: "relative",
              width: size,
              height: size,
              mr: 1,
            //   border: "1px solid red",
              "& img": {
                objectFit: "contain",
              },
              ...sx
            }}
          >
            <Image src={logoImage} alt="inkspiff logo" fill
              sizes={`(max-width: 2000px) ${size}`}
             />
          </Box>
          <Typography
        sx={{
          fontWeight: 700,
          fontSize: `${size}`
        }}
      >
        Inkspiff
      </Typography>
          </Box>
      break;
    }
  
}

export default Logo