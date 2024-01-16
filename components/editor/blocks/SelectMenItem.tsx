import React, { useState, useEffect, useCallback } from "react";
import { matchSorter } from "match-sorter";
import  {BlockSelectItemType} from "@/types/editor"
import { SUPPORTED_BLOCKS, MENU_HEIGHT } from "@/config/editor";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

interface propTypes {
  onSelect: (block: BlockSelectItemType) => void;
  item: BlockSelectItemType;
  isSelected: boolean
}


const SelectMenuItem: React.FC<propTypes> = ({ onSelect, item, isSelected }) => {

 
          return (
            <Box
              className={isSelected ? "Selected" : undefined}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(item)}
              sx={{
                "&:hover": {
                  backgroundColor: "#f6f5f4",
                },
                backgroundColor: isSelected ? "#f6f5f4" : "",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding:{xs: "4px", sm: "8px"},
                borderRadius: "4px",
                boxShadow: {xs: 2, sm: "auto"},
                // border: "1px solid red",
              }}
            >
              <Box sx={{
                width: {xs: "30px", sm: "45px"},
                height: {xs: "30px", sm: "45px"},
                borderRadius: "4px",
                bgcolor: "background.paper",
                padding: "8px",
                border: "1px solid #121212"
              }}></Box>

              <Box style={{
                // border: "1px solid red",
                marginLeft: "4px",
              }}>
                <h6 style={{
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  margin: "0 0 0 0",
                }}>{item.label}</h6>
                <Typography sx={{
                  fontWeight: 400,
                  fontSize: "0.75rem",
                  margin: 0,
                  marginBottom: "4px",
                  color: "#121212",
                  display: {xs: "none", sm: "block"}
                }}>This is a small description</Typography>

              </Box>
            </Box>
          );
};

export default SelectMenuItem;
