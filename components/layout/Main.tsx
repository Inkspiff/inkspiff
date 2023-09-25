import React from "react"
import Box from "@mui/material/Box"
import {SxProps} from "@mui/material"

interface MainInterface {
    children?: React.ReactNode;
    sx?: SxProps
}

const Main = ({children, sx}: MainInterface) => {
    return <Box  component="main"
        sx={{
          mt: {sm: "64px", xs: "56px"},
          px: 2,
          ...(sx ? sx : {})
        }}>{children}</Box>
}

export default Main