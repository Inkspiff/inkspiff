import React from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"

const Features = () => {
  return (
    <Box>
      <Typography variant="h2" sx={{
        mb: 2
      }}>
      Work faster.
      Automate tedious tasks.
      </Typography>

      <Paper sx={{
        p: 2,
        mb: 2,
      }}>
        <Typography variant="h6" sx={{
          mb: 2
        }}>
        Your ultra-capable teammate.
        </Typography>
          <Typography >
          Messy notes? Have Notion AI summarize what’s important and actionable. No need to jump back and forth between your notes and a separate AI app.
          </Typography>
      </Paper>
      <Grid container spacing={2}>

        <Grid item sm={4}>
          <Paper sx={{
            p: 2
          }}>
            <Typography variant="h6" sx={{
              mb: 2
            }}>
              Actions
            </Typography>
            <Typography variant="body1" sx={{
              mb: 2,
            }}>
              Surface what's important from reseach sales calls & more
            </Typography>
          </Paper>
        </Grid>

        <Grid item sm={4}>
          <Paper sx={{
            p: 2
          }}>
            <Typography variant="h6" sx={{
              mb: 2,
            }}>
              Actions
            </Typography>
            <Typography variant="body1" sx={{
              mb: 2,
              p: 2,
            }}>
              Surface what's important from reseach sales calls & more
            </Typography>
          </Paper>
        </Grid>

        <Grid item sm={4}>
          <Paper sx={{
            p: 2
          }}>
            <Typography variant="h6" sx={{
              mb: 2
            }}>
              Actions
            </Typography>
            <Typography variant="body1" sx={{
              mb: 2
            }}>
              Surface what's important from reseach sales calls & more
            </Typography>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  )
}

export default Features