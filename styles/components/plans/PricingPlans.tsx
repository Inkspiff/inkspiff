import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import Progress from '@mui/material/Progress';
import {freePlan, proPlan} from "@/config/subscription"
import DoneRoundedIcon from "@mui/icons-material/DoneRounded"

const PLANS = [freePlan, proPlan]

const PricingPlans = () => {
  return (
    <Grid container spacing={2} sx={{
        maxWidth: "760px",
        mb: 4,
    }}>
        {PLANS.map((plan, index) => {
            return <Grid item xs={6} key={index}>
                <Paper sx={{
                    borderRadius: "8px"
                }} variant="outlined" elevation={0}>
                    <Box sx={{
                        p: 2,
                    }}>
                    <Typography component="h4" sx={{
                    fontSize: "28px",
                    textTransfrom: "capitalize",
                    fontWeight: 600,
                    color: (plan.name === "Free") ? "warning.main" : "info.main"
                }}>{plan.name}</Typography>
                    <Typography variant="body1" >For organizing the best of the best.</Typography>
                    </Box>
               

                <Box sx={{
                    bgcolor: "action.hover",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <Typography variant="body1" sx={{
                    fontSize: "32px",
                    fontWeight:700,
                }}>$4.99</Typography>
                <Typography variant="caption" sx={{
                }}>$4.99 per month</Typography>

                <Button variant="contained" sx={{
                    my: 2
                }}>Get Started</Button>
                <Typography variant="body1" sx={{
                    fontWeight: 700,
                    mb: 1,
                }}>Everything in Free, and</Typography>

                {plan.features.map((feature, index) => {
                    return <List key={index} sx={{
                        // border: "1px solid red",
                        p: 0,
                        // mb: 2,
                    }}>
                    <ListItem sx={{
                        // border: "1px solid blue",
                        p: 0,
                        m: 0,
                    }}>
                        <ListItemIcon sx={{
                            minWidth: 0
                        }}>
                        <DoneRoundedIcon sx={{
                            fontSize: "18px",
                            mx: "8px"
                        }} />
                        </ListItemIcon>
                        <ListItemText primary={ <Typography variant="body1">
                        {feature}
                       </Typography>} />
                       
                    </ListItem>
                </List>
                })}
                </Box>
                
                
                </Paper>
                
            </Grid>
        })}
        
    </Grid>
  )
}

export default PricingPlans