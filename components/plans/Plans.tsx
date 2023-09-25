import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
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

const Plans = () => {
  return (
    <Grid container spacing={2}>
        {PLANS.map((plan, index) => {
            return <Grid item xs={6} key={index}>
                <Typography component="h4" sx={{
                    fontSize: "32px",
                    textTransfrom: "capitalize",
                    fontWeight: 700,
                }}>{plan.name}</Typography>
                <Typography variant="body2" sx={{
                    my: 2,
                }}>$4.99 per month</Typography>
                <Typography variant="body2" sx={{
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
                        <ListItemText primary={ <Typography variant="body2">
                        {feature}
                       </Typography>} />
                       
                    </ListItem>
                </List>
                })}
                <Button variant="contained" sx={{
                    my: 2
                }}>Upgrade</Button>
            </Grid>
        })}
        
    </Grid>
  )
}

export default Plans