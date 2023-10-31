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

const BlockListItem = ({block}: PropTypes) => {
        const {content} = block
    
    return <Box component="div">
        {content.map((item, index) => {
            return <Box component="div"  key={index}>
            </Box>
        })}
    </Box>
}


export default BlockListItem