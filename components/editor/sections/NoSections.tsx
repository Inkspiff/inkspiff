import React from 'react'
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import BottomPanel from '../layout/BottomPanel'
import AddSectionBottomPanel from './AddSectionBottomPanel'

const NoSections = ({}) => {
  return (
    <>
    <Paper elevation={0} variant="outlined" sx={{
      // border: "1px solid red",
      display: "flex",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      borderRadius: 0,
      borderWidth: "0 1px 0 0",
      position: "relative",
    }}>
      <Paper  elevation={0} variant="outlined" sx={{
        p: 2,
        borderRadius: "12px"
      }}>
      <Typography sx={{

}}>No <br />Sections Added</Typography>
      </Paper>
      
    </Paper>
   
   <AddSectionBottomPanel />
    </>
    
  )
}

export default NoSections