import React, { useState, useEffect, useCallback } from "react";
import { matchSorter } from "match-sorter";
import  {SelectMenuItemType} from "@/types/editor"
import { SUPPORTED_BLOCKS, MENU_HEIGHT } from "@/config/editor";
import Box from "@mui/material/Box"


interface propTypes {
  onSelect: (block: SelectMenuItemType) => void;
  item: SelectMenuItemType;
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
                padding: "8px",
                borderRadius: "4px",
              }}
            >
              <div style={{
                width: "45px",
                height: "45px",
                borderRadius: "4px",
                backgroundColor: "white",
                padding: "8px",
                border: "1px solid #f6f5f4"
              }}></div>

              <div style={{
                // border: "1px solid red",
                marginLeft: "4px",
              }}>
                <h6 style={{
                  fontWeight: 400,
                  fontSize: "1rem",
                  margin: "0 0 0 0",
                }}>{item.label}</h6>
                <p style={{
                  fontWeight: 400,
                  fontSize: "0.75rem",
                  margin: 0,
                  marginBottom: "4px",
                  color: "#121212"
                }}>This is a small description</p>
              </div>
            </Box>
          );
};

export default SelectMenuItem;
