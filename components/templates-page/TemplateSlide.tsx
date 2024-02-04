import React from "react"
import Image from "next/image"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded"
import {TemplateType} from "@/types"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded"

interface propTypes {
    templates: TemplateType[]
}

const TemplateSlide = ({templates}: propTypes) => {
    const [inView, setInView] = React.useState<number>(0)

    const forward = () => {
        setInView((prev) => {

            if (prev === (templates.length - 1)) {
                return 0
            } else {
                return prev + 1
            }

        })
    }

    const backward = () => {
        setInView((prev ) => {

            if (prev === 0) {
                return templates.length - 1
            }  else {
                return prev - 1
            }

        })
    }


    return <Box sx={{
        my: 2
    }}>
        <Typography variant="h3" sx={{
            mb: 2,
        }}>Templates of the month</Typography>
        <Paper elevation={0} variant="outlined" sx={{
            height: "300px",
            mb: 2,
            position: "relative",
            "& img": {
                objectFit: "contain"
            }
        }}>
            <Image src={"/img/logo-black.png"} alt={templates[inView].name} fill sizes={`(min-width=0) 100%`} priority={true} /> 
        </Paper>
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
            pb: 2,
        }}>
            <Box>
                <Typography sx={{

                }}>Client brand proposal template</Typography>
                <Typography sx={{
                    
                }}>Precious</Typography>
            </Box>
            <Box >
                <IconButton sx={{
                    border: "1px solid",
                    borderColor: "grey.A400",
                    mr: 1,
                }}>
                <ChevronLeftRoundedIcon />
                </IconButton>
                <IconButton sx={{
                    border: "1px solid",
                    borderColor: "grey.A400",
                }}>
                <ChevronRightRoundedIcon />
                </IconButton>
                
            </Box>
        </Box>
    </Box>
}

export default TemplateSlide