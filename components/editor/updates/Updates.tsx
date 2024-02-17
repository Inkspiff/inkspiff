import React, {useEffect} from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import { useSession, signIn, signOut } from "next-auth/react";

const UPDATES: {
    title: string,
    image: string,
    note: string
}[] = []

 const Updates = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const handleGetUpdates = async () => {
      const response = await fetch("/api/db/get-file-updates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id
        })
      })

      if (!response?.ok) {
        return 
      }

      const updates = await response.json()
      console.log({updates})
    }
    handleGetUpdates()

  }, [])

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