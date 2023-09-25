import React from 'react'
import Container from "@mui/material/Container"
import {SxProps} from "@mui/material"

interface PaddedContainerInterface {
    children?: React.ReactNode;
    sx?: SxProps
}

const PaddedContainer = ({children, sx}: PaddedContainerInterface) => {

  return (

     <Container sx={{
        px: {
            xs: "1rem",
            sm: "2rem",
            lg: "4rem",
          },
          py: {
            xs: "2rem",
            sm: "4rem",
            lg: "8rem",
          },
        ...(sx ? sx : {})
     }}>

      {children}

    </Container>
  )
}

export default PaddedContainer