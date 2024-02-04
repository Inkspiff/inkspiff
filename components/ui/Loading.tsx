import React from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { SxProps } from "@mui/system"

interface propTypes { 
    sx? : SxProps,
    innerSx? : SxProps
  }

const Loading = ({sx={}, innerSx={}}) => {
  return (
    <Box sx={{
        // border: "4px solid purple",
        height: "100%",
        position: "relative",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx
      }}>
        <Typography sx={{
          fontSize: "1.5rem",
          textAlign: "center",
          ...innerSx
        }}>Loading...</Typography>
      </Box>
  )
}

export default Loading