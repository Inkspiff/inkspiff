import React from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import PaddedContainer from '@/components/layout/PaddedContainer'


const LIST = [
    {
        title: "Zero markdown knwoledge",
        desc: "AI-Driven Content Generation: Let our AI create well-structured, concise, and stylish readme files for your projects.",
    },
    // {
    //     title: "Customization",
    //     desc: "Tailor the content to suit your project's unique needs, tone, and style.",
    // },
    {
        title: "Beautiful Templates",
        desc: "Choose from a library of elegant readme templates to make your documentation stand out.",
    },
    {
        title: "120X Faster",
        desc: "Get your readme files ready in seconds, allowing you to focus on what truly matters – your code.",
    },

]

const Features = () => {

  return (
    <Box sx={{
        // bgcolor: "rgba(233, 233, 234)",
      }}>
      <PaddedContainer>

        <Typography variant="h2" sx={{
          textAlign: "center",
          mt: 4,
        }}>
          Professional READMEs in seconds.
        </Typography>

       
          
          <Grid container spacing={3} sx={{
            // border: 1
          }}>
            {LIST.map((item, index) => {
                return <Grid key={index} item xs={index === 0 ? 12 : 6}>
                <Paper elevation={0} sx={{
                    borderRadius: 2,
                    bgcolor: 'action.hover',
                    p: 3,
                    height: "100%",
                }}>
                    <Typography variant='h6' sx={{
                    mb: 1,
            }}>
              {item.title}
            </Typography>
                <Typography  sx={{
              
            }}>
              {item.desc}
            </Typography>
                </Paper>
            </Grid>
            })}
            
            
            
          </Grid>

          
          
        


      </PaddedContainer>
      </Box>

  )
}

export default Features