import React, { useState, useEffect, useCallback } from "react";
import { matchSorter } from "match-sorter";
import  {BlockSelectItemType} from "@/types/editor"
import { SUPPORTED_BLOCKS, MENU_HEIGHT } from "@/config/editor";
import Box from "@mui/material/Box"
import SelectMenuItem from "@/components/editor/SelectMenItem";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";

interface SelectMenuProps {
  position: { x: number | null; y: number | null };
  onSelect: (block: BlockSelectItemType) => void;
  close: () => void;
}


const SelectMenu: React.FC<SelectMenuProps> = ({ position, onSelect, close }) => {  
  const app = useSelector((state: RootState) => state.app);
  
  const [command, setCommand] = useState("");
  const [items, setItems] = useState<BlockSelectItemType[]>(SUPPORTED_BLOCKS);
  const [selectedItem, setSelectedItem] = useState(0);

  const {viewSettings } = app;
  const {drawer: open} = viewSettings

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
          if (!command) close();
          setCommand(command.substring(0, command.length - 1));
          // // e.preventDefault();
          // let prevSelected = selectedItem === 0 ? items.length - 1 : selectedItem - 1;
          // setSelectedItem(prevSelected);
          break;
        case "ArrowDown":
          if (!command) close();
          setCommand(command.substring(0, command.length - 1));
          // let oldSelected = selectedItem === items.length ? 0 : selectedItem + 1;
          // setSelectedItem(oldSelected);
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

  const x = open ? position.x - 240 : position.x;
  const y = (position.y - 20);
  const positionAttributes = { top: y, left: x };

  console.log({position, positionAttributes})

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

  return (
    <div className="SelectMenu" style={menuWrapperStyles}>
      <div className="Items" style={{
    width: "100%",
    height: "100%",
    overflowY: "auto",
    padding: "4px",
    // border: "1px solid red",
    backgroundColor: "white",
    border: "2px solid #f6f5f4"
  }
}>
        <h5 style={{
                  fontWeight: 400,
                  fontSize: "0.75rem",
                  margin: "8px 0",
                  padding: "0 8px"
                }}>Basic Blocks</h5>
        {items.map((item, key) => {
          return (
           <SelectMenuItem key={key} item={item} onSelect={onSelect} isSelected={(items.indexOf(item) === selectedItem)} />
          );
        })}
      </div>
    </div>
  );
};

export default SelectMenu;
