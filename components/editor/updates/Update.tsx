import { getUpdatesText } from '@/lib/utils'
import { FileUpdateType } from '@/types/editor'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import React from 'react'
import dayjs from 'dayjs'

interface UpdatesProps extends FileUpdateType {
    
}

const Update = (props: FileUpdateType) => {
  const { type,
    from,
    to,
    message,
    sentAt,
    image,
    seen,
    markdownID } = props

    const updateText = getUpdatesText(type)

    const sentAtDate = dayjs(sentAt * 1000).format("DD/MM/YYYY")
    const sentAtTime = dayjs(sentAt * 1000).format("HH:mm")

  return (
    <Box sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottom: "1px solid #f0f0f0",
        cursor: "pointer",
        p: 2,
        borderStyle: "solid",
        borderWidth: "0 0 0 2px",
        borderColor: "transparent",
        "&:hover": {
            backgroundColor: "action.hover",
            borderColor: "primary.main",
        }
    }}>
        <Box>
            <Typography variant="body2" sx={{
                fontSize: "12px",
            }}>{message}</Typography>
        </Box>
        

        <Box sx={{
            textAlign: "right",
            marginLeft: 2,
        }}>
            <Typography variant="body2" sx={{
                fontSize: "12px",
            }}>{sentAtDate}</Typography>
            <Typography variant="body2" sx={{
                fontSize: "10px",
            }}>{sentAtTime}</Typography>
        </Box>
        <Divider sx={{
          }}/>
    </Box>
  )
}

export default Update