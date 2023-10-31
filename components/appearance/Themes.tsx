import React, {useContext} from "react"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ThemeContext } from '@/context/ThemeContext';
import {SUPPORTED_THEMES} from "@/config/theme"


const Themes = () => {
    const { switchTheme, theme} = useContext(ThemeContext);



    return <Box sx={{
    }}>
        {/* <Typography variant="body2" sx={{
            mb: 2
        }}>Available Themes</Typography> */}

        <Box sx={{
            mb: 2,
        display: "flex",
        }}>
            {SUPPORTED_THEMES.map((obj, index) => {
                const {theme: thm, name, mode} = obj
                return <Box key={index}  sx={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mr: 3,
                }}>
                    <Paper variant="outlined" elevation={0} sx={{
                        bgcolor: thm.palette.background.default,
                        borderRadius: "6px",
                        width: "70px",
                        height: "70px",
                       
                        mb: "4px",
                        p: 1,
                        cursor: "pointer",

                    }} onClick={() => {switchTheme(name)}}> 
                        <Typography variant="body2" sx={{
                            textAlign: "center",
                            fontSize: "32px",
                            fontWeight: 700,
                            color: thm.palette.text.primary
                        }}>T</Typography>
                        <Paper elevation={0} sx={{
                            width: "100%",
                            height: "8px",
                            bgcolor: thm.palette.action.hover,
                            borderRadius: "4px",
                        }}></Paper>
                    </Paper>
                    <Typography variant="body2" sx={{
                        // width: "100%",
                        textAlign: "center",
                        textTransform: "capitalize",
                        // border: "1px solid red",
                    }}>{name}</Typography>
                </Box>
            })}
        </Box>

        
    </Box>
}

export default Themes