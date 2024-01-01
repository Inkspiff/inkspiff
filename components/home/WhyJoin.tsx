import React, {useContext} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Quote from "@/components/home/Quote";
import PaddedContainer from "@/components/layout/PaddedContainer";
import { ThemeContext } from '@/context/ThemeContext';

const excuseAnswers = [
  {
    icon: "",
    heading: "Be the first to know",
    text: `Join our waiting list and be among the pioneers shaping the future of code docs while gaining a head start in experiencing our innovative platform.`,
  },
  {
    icon: "",
    heading: "Early access perks",
    text: "Secure exclusive early access, and from the very beginning, you will have early access bonuses on your account.",
  },
  {
    icon: "",
    heading: "Drive the community",
    text: "Be an integral part of the growing Inkspiff community, connecting with like-minded enthusiasts and contributors.",
  },
];

const WhyJoin = () => {
  const { toggleTheme, theme} = useContext(ThemeContext);

  const {palette, } = theme
  const {mode } = palette
  
  return (
    <Box
      sx={{
        // border: "1px solid black",
        width: "100%",
        overflow: "hidden",
       
      }}
    >
      <PaddedContainer>
      
        <Typography
          variant="h2"
          sx={{
            my: 4,
            textAlign: "center",
          }}
        >
          Why join out list?
        </Typography>

        <Grid container spacing={0}>
          {excuseAnswers.map((point, index) => {
            return (
              <Grid key={index} item xs={12} md={12}>
                <Paper
                  elevation={0}
                  sx={{
                    // bgcolor: 'action.hover',
                    

                    borderLeft: mode === "light" ? "2px dashed #c5c5c5" :  "2px dashed #3e3e3e" ,
                    // borderImage: "linear-gradient(0deg, #000 1px, transparent 0px) 1",
                    // borderImageWidth: "2px",
                    // borderImageSlice: 2,

                    pb: index === 2 ? 3 : 6,
                  }}
                >
                  <Typography variant="h4" sx={{
                    borderLeft: mode === "light" ? "2px solid #121212" : "2px solid #c1c1c1" ,
                    px: 3,
                    mb: 1,
                    transform: "translateX(-2px)"
                  }}>{point.heading}</Typography>
                  <Typography variant="body1"
                  sx={{
                    px: 3,
                  }}>{point.text}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      
      </PaddedContainer>
    </Box>
  );
};

export default WhyJoin;
