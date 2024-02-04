import React from 'react'
import Button from '@mui/material/Button'
import { IoIosLink } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";

const CopyLink = () => {
    const app = useSelector((state: RootState) => state.app)
    const {markdown} = app

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`https://inkspiff.com/${markdown.title.trim().split(" ").join("-")}-${markdown.id}`)
      }

  return (
    <Button variant="text" size="small" sx={{
        display: "flex",
      alignItems: "center",
      }} onClick={handleCopyLink}> 
          <IoIosLink style={{
            marginRight: "4px"
          }} />Copy Link
      </Button>
  )
}

export default CopyLink