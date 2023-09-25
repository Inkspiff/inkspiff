import React from 'react'
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Themes from "@/components/appearance/Themes"

const General = () => {


  return (
    <Box>
        <Typography variant="body1" component="h2" sx={{
          fontWeight: 700,
          mb: 2,
        }}>My settings</Typography>
        <Divider sx={{
          my: 2
        }}/>

        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        }}>
            <Box>
                <Typography variant="body2" component="h4" sx={{
                  mb: "4px",
                }}>Appearance</Typography>
                <Typography variant="body2" sx={{
                  fontSize: "12px",
                  mb: 2,
                }} >Customize how Inkspiff looks on your device.</Typography>

                <Themes />

                 <Typography variant="caption">More themes will be supported as we progress.</Typography>
            </Box>
        </Box>

        
    </Box>
  )
}

export default General