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
    heading: "Visualize, filter & sort any way you want",
    text: `By joining our waiting list, you'll be among the first to experience the future of code documentation. Get exclusive early access and be a part of the Inkspiff community from the very beginning.`,
  },
  {
    icon: "",
    heading: "Customize the info you track",
    text: "Create your own labels, tags, owners, and more, so everyone has context and everything stays organized.",
  },
  {
    icon: "",
    heading: "Build any page, communicate any idea",
    text: "Everything is drag and drop in Notion — images, toggles, to-do’s, even embedded databases.",
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
              <Grid key={index} item xs={12} md={index !== 12 && 12}>
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