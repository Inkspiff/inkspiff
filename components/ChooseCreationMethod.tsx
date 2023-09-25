import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

interface ChooseCreationMethodInterface {
  onHandleNew: (type: number) => void;
}

const ChooseCreationMethod = ({ onHandleNew }: ChooseCreationMethodInterface) => {
  const handleSelectType = (_newType: number) => {
    onHandleNew(_newType);
  };

  return (
    <Box
      sx={{
        // border: "1px solid black",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          mb: 4,
        }}
      >
        How would you like to start?
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {["Create AI Readme", "Use Template", "Start Blank"].map(
          (type, index) => {
            return (
              <Paper
                key={index}
                elevation={2}
                sx={{
                  p: 2,
                  width: { xs: "80px", sm: "120px" },
                  height: { xs: "80px", sm: "120px" },
                  m: 2,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  borderRadius: "8px",
                  outline: "1px solid #f6f5f4",
                }}
                onClick={() => {
                  handleSelectType(index);
                }}
              >
                {type}
              </Paper>
            );
          }
        )}
      </Box>
    </Box>
  );
};

export default ChooseCreationMethod;
