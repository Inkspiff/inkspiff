import React, { useState, useEffect, useCallback } from "react";
import { matchSorter } from "match-sorter";
import  {BlockSelectItemType} from "@/types/editor"
import { SUPPORTED_BLOCKS, MENU_HEIGHT } from "@/config/editor";
import Box from "@mui/material/Box"


interface SelectMenuProps {
  position: { x: number | null; y: number | null };
  onSelect: (block: BlockSelectItemType) => void;
  close: () => void;
}


const SelectMenu: React.FC<SelectMenuProps> = ({ position, onSelect, close }) => {
  const [command, setCommand] = useState("");
  const [items, setItems] = useState<BlockSelectItemType[]>(SUPPORTED_BLOCKS);
  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          onSelect(items[selectedItem]);
          break;
        case "Backspace":
          if (!command) close();
          setCommand(command.substring(0, command.length - 1));
          break;
        case "ArrowUp":
          // e.preventDefault();
          let prevSelected = selectedItem === 0 ? items.length - 1 : selectedItem - 1;
          setSelectedItem(prevSelected);
          break;
        case "ArrowDown":
          let oldSelected = selectedItem === items.length ? 0 : selectedItem + 1;
          setSelectedItem(oldSelected);
          break;
        case "Tab":
          e.preventDefault();
          const nextSelected = selectedItem === items.length - 1 ? 0 : selectedItem + 1;
          setSelectedItem(nextSelected);
          break;
        default:
          setCommand(command + e.key);
          break;
      }
    };

    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [command, items, selectedItem, onSelect, close]);

  useEffect(() => {
    const matchedItems = matchSorter(SUPPORTED_BLOCKS, command.replace("/", ""), { keys: ["tag"] });
    setItems(matchedItems);
  }, [command]);

  if (position.x === null || position.y === null) {
    return null;
  }

  const x = position.x;
  const y = (position.y - MENU_HEIGHT + 64 + 8) - 32;
  const positionAttributes = { top: y, left: x };

  const menuWrapperStyles: React.CSSProperties = {
    position: "absolute",
    ...positionAttributes,
    borderRadius: "6px",
    overflow: "hidden",
    height:  `${MENU_HEIGHT}px`,
    minWidth: `260px`,
    backgroundColor: "white",
    zIndex: 1000,
    
  }

  const menuStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    overflowY: "auto",
    padding: "4px",
    // border: "1px solid red",
    backgroundColor: "white",
    border: "2px solid #f6f5f4"
  }

  return (
    <div className="SelectMenu" style={menuWrapperStyles}>
      <div className="Items" style={menuStyles}>
        <h5 style={{
                  fontWeight: 400,
                  fontSize: "0.75rem",
                  margin: "8px 0",
                  padding: "0 8px"
                }}>Basic Blocks</h5>
        {items.map((item, key) => {
          const isSelected = items.indexOf(item) === selectedItem;
          return (
            <Box
              className={isSelected ? "Selected" : undefined}
              key={key}
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
        })}
      </div>
    </div>
  );
};

export default SelectMenu;
