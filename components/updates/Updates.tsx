import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"

const UPDATES: {
    title: string,
    image: string,
    note: string
}[] = []

 const Updates = () => {
    return <Box>
        <Typography variant="body1" component="h2" sx={{
          fontWeight: 700,
          mb: 2,
        }}>Updates</Typography>
        <Divider sx={{
          my: 2
        }}/>

        {(UPDATES.length > 0) ? 
        <Box></Box> : 
        <Box sx={{
            m: 2,
            p: 2,
            textAlign: "center",

        }}>
            No updates for now.
            </Box>}
    </Box>
}

export default Updates