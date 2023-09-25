import React from 'react'
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

const Billing = () => {
  return (
    <Box>
        <Typography variant="body1" component="h2" sx={{
          fontWeight: 700,
          mb: 2,
        }}>Billing</Typography>
        <Divider sx={{
          my: 2
        }}/>


              <Typography variant="body2" component="h4" sx={{
                    
                  }}>Subscription Plan</Typography>
                  <Typography variant="caption" sx={{
                  mb: 2,
                  }}>You are currently on the Free plan.</Typography>
              <Typography variant="body2" sx={{
                  mb: 2,
                  }}>The free plan is limited to 3 posts. Upgrade to the PRO plan for unlimited posts.</Typography>
                <Button variant="contained">Upgrade to Pro</Button>

              
        
    </Box>
  )
}

export default Billing