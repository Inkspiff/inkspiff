import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Quote from "@/components/home/Quote";

const excuseAnswers = [
  {
    icon: "",
    heading: "Visualize, filter & sort any way you want",
    text: `Show only tasks assigned to you, or items marked as urgent.<b/>Break down any project in the way that’s most helpful to you.`,
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

const KeyPoints = () => {
  return (
    <Box
      sx={{
        // border: "1px solid black",
        width: "100%",
        overflow: "hidden",
        px: {
          xs: "2rem",
          sm: "4rem",
          md: "8rem",
        },
        py: 8,
      }}
    >
      <Box>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            textAlign: "center",
            margin: "auto",
            my: 4,
            maxWidth: "540px",
          }}
        >
          Present your projects proffesionally.
        </Typography>

        <Box
          sx={{
            my: "125px",
          }}
        >
          <Quote
            text="We got rid of nearly a dozen different tools because of what Inskpill does for us."
            by="Precious Nwaoha"
            from="Software Developer, Patentic"
          />
        </Box>
      </Box>

      <Box
        sx={{
          my: 8,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            my: 4,
            textAlign: "center",
          }}
        >
          What&apos;s your excuse now.
        </Typography>

        <Grid container spacing={2}>
          {excuseAnswers.map((point, index) => {
            return (
              <Grid key={index} item xs={12} md={index !== 0 && 6}>
                <Paper
                  elevation={0}
                  sx={{
                    bgcolor: 'action.hover',
                    p: 3,
                  }}
                >
                  <Typography variant="h5">{point.heading}</Typography>
                  <Typography variant="body1"
                  >{point.text}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
        <Box
          sx={{
            mt: 4,
          }}
        >
          <Quote
            text="We got rid of nearly a dozen different tools because of what Inskpill does for us."
            by="Precious Nwaoha"
            from="Software Developer, Patentic"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default KeyPoints;
