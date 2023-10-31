import React, {useContext} from 'react'
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import { ThemeContext } from '@/context/ThemeContext';

interface propTypes {
    size: number,
    sx?: React.CSSProperties,
}

const LogoImage = ({size=34, sx}: propTypes) => {
    const { theme } = useContext(ThemeContext);

    const {palette} = theme

    const {mode} = palette


  return (
    <Box
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
            <Image src={(mode === 'light') ? "/img/logo-black.png" : "/img/logo-white.png"} alt="inkspiff logo" fill
              
              sizes={`(max-width: 2000px) ${size}`}
            />
          </Box>
  )
}

export default LogoImage