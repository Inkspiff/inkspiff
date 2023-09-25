import React from "react"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded"
import Input from '@mui/material/Input';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
// or

const TemplateSlide = () => {
    const [value, setValue] = React.useState<string>("")
    
    return <Box sx={{
        py: 2,
        border: "1px solid red",
        overflowY: "scroll",
        height: "100vh",
        position: "sticky",
    }}>
        <Input 
        fullWidth
        value={value} 
        placeholder={"Search..."}
        startAdornment={<SearchOutlinedIcon />}
        sx={{

        }}
        type="text"
        />
    </Box>
}

export default TemplateSlide