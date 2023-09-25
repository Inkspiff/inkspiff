import React from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"

const Features = () => {

  return (
    <Box sx={{
      
    //   outline: "1px solid black",
      width: "100%",
      overflow: "hidden",
      px: {
        xs: "2rem",
        sm: "4rem",
        md: "8rem"
      },
      py: 8,
    }}>
     

        <Typography variant="h2" sx={{
            textAlign: "center",
            fontWeight: 700,
            maxWidth: "450px",
            margin: "auto",
            mb: 4,
            mt: 4,
        }}>
            Writing Markdown has never been easier.
        </Typography>
    
      
        <Grid container>
        <Grid item sm={12} md={4} sx={{
            outline: "1px solid black",
            height: "100vh",
        }}>
            <Box>
                <Typography variant="h3">AI READMEs</Typography>
                <Typography variant="body1">
                    It’s hard to move fast if you can’t find anything. Centralize all your knowledge in Notion.</Typography>
                
            </Box>
        </Grid>

        <Grid item sm={12} md={8} sx={{
            outline: "1px solid black",
            height: "100vh",
        }}>
            <Box sx={{
                outline: '1px solid black',

            }}>
                
                {/* image */}
            </Box>
        </Grid>



        <Grid item sm={12} md={4} sx={{
            outline: "1px solid black",
            height: "100vh",
        }}>
            <Box>
                <Typography variant="h3">Markdown Templates</Typography>
                <Typography variant="body1">
                    It’s hard to move fast if you can’t find anything. Centralize all your knowledge in Notion.</Typography>
                
            </Box>
        </Grid>
        <Grid item sm={12} md={8} sx={{
            outline: "1px solid black",
            height: "100vh",
            
        }}>
            <Box sx={{
                outline: '1px solid black',

            }}>
                
                {/* image */}
            </Box>
        </Grid>



        <Grid item sm={12} md={4} sx={{
            outline: "1px solid black",
            height: "100vh",
        }}>
            <Box>
                <Typography variant="h3">Write Markdown</Typography>
                <Typography variant="body1">
                    It’s hard to move fast if you can’t find anything. Centralize all your knowledge in Notion.</Typography>
                
            </Box>
        </Grid>
        <Grid item sm={12} md={8} sx={{
            outline: "1px solid black",
            height: "100vh",
            
        }}>
            <Box sx={{
                outline: '1px solid black',

            }}>
                
                {/* image */}
            </Box>
        </Grid>
        
      </Grid>
      

    </Box>
  )
}

export default Features