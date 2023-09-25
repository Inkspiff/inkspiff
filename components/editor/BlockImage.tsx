import React from "react"
import Box from "@mui/material/Box"

interface PropTypes {
    block: {
        id: string
        tag: string,
        type: number,
        content: string[]
    }
}

const BlockImage = ({block}: PropTypes) => {
        const {content} = block
    
    return <Box component="div">
        {content.map((text, index) => {
            return <Box component="div"  key={index}>
                {text}
            </Box>
        })}
    </Box>
}


export default BlockImage