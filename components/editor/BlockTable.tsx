import React from "react"
import Box from "@mui/material/Box"

interface PropTypes {
    table: {
        id: string
        tag: string,
        type: number,
        content: string[]
    }
}

const BlockTable = ({table}: PropTypes) => {
        const {content} = table
    
    return <Box component="table">
        {content.map((tableRow, rowIndex) => {
            const cellItems = tableRow.split(",")

            return <Box component="tr"  key={rowIndex}>

                {cellItems.map((cell, cellIndex) => {
                    
                    return <Box component="td" key={cellIndex}>
                        {cell}
                    </Box>
                })}
            </Box>
        })}
    </Box>
}


export default BlockTable