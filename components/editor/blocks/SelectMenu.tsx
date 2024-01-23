import { useState, useEffect, useCallback, useRef } from "react";
import { matchSorter } from "match-sorter";
import  {BlockSelectItemType} from "@/types/editor"
import { SUPPORTED_BLOCKS, MENU_HEIGHT } from "@/config/editor";
import Box from "@mui/material/Box"
import Popover from "@mui/material/Popover"
import Paper from "@mui/material/Paper"
import SelectMenuItem from "@/components/editor/blocks/SelectMenItem";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";

interface SelectMenuProps {
    open: boolean;
  position: { x: number | null; y: number | null };
  onSelect: (block: BlockSelectItemType) => void;
  close: () => void;
}


const SelectMenu: React.FC<SelectMenuProps> = ({ open, position, onSelect, close }) => {  
  const app = useSelector((state: RootState) => state.app);

  const boxRef = useRef<HTMLDivElement>(null);
  
  const [command, setCommand] = useState("");
  const [items, setItems] = useState<BlockSelectItemType[]>(SUPPORTED_BLOCKS);
  const [selectedItem, setSelectedItem] = useState(0);

  const {viewSettings } = app;
  const {drawer} = viewSettings


  const clearAndSelect = (block: BlockSelectItemType) => {
    setCommand("")
    setSelectedItem(0)
    onSelect(block)
  }
  

  useEffect(() => {
    const clearAndClose = () => {
      setCommand("")
      setSelectedItem(0)
      close()
    }
    const keyDownHandler = (e: KeyboardEvent) => {
      // console.log("Inside: ", {command, key: e.key})
    
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          setCommand("")
          const itemIndex = selectedItem
          setSelectedItem(0)
          onSelect(items[itemIndex]);
          break;
        case "Backspace":
          if (!command.replace("/", "")) clearAndClose();
          setCommand(command.substring(0, command.length - 1));
          break;
        case "ArrowUp":
          // if (!command) clearAndClose();
          e.preventDefault();
          let prevSelected = selectedItem === 0 ? items.length - 1 : selectedItem - 1;
          if (boxRef.current) {
            boxRef.current.scrollTop = prevSelected * 62;
          }
          
          setSelectedItem(prevSelected);
          break;
        case "ArrowDown":
          // if (!command) clearAndClose();
          e.preventDefault();
          let oldSelected = selectedItem === items.length - 1 ? 0 : selectedItem + 1;
          
          if (boxRef.current) {
            boxRef.current.scrollTop = oldSelected * 62;
          }
          
          setSelectedItem(oldSelected);
          break;
        case "Tab":
          e.preventDefault();
          const nextSelected = selectedItem === items.length - 1 ? 0 : selectedItem + 1;
          setSelectedItem(nextSelected);
          break;
        case "Capslock":
          // do nothing
          break;
        default:
          // TODO: e.key shou be alphanumeric
          if (e.key.length === 1) {
            setCommand(command + e.key);
          }
          
          break;
      }
    };

    if (open) {
      document.addEventListener("keydown", keyDownHandler);
    }
    
    return () => {
      if (open) {
        document.removeEventListener("keydown", keyDownHandler);
      }
      
    };
  }, [command, items, selectedItem, onSelect, close]);

  useEffect(() => {
    const commandWithoutSlash = command.replace("/", "") 
    // console.log({commandWithoutSlash})
    if (!(commandWithoutSlash === "")) {
      const matchedItems = matchSorter(SUPPORTED_BLOCKS, commandWithoutSlash, { keys: ["tag", "label"] });
      setItems(matchedItems);
    } else {
      setItems(SUPPORTED_BLOCKS)
    }

    setSelectedItem(0)
   
  }, [command]);

  if (position.x === null || position.y === null) {
    return null;
  }

  const x = drawer ? position.x : position.x;
  const y = (position.y + 20);
  const positionAttributes = { top: y, left: x };



  return (
    <Popover 
     id={open ? 'select-popover' : undefined}
     open={open}
    //  anchorEl={anchorEl}
     onClose={() => {
      setCommand("")
      close()
     }}
  anchorReference="anchorPosition"
  anchorPosition={{ top: y, left: x }}
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}

  PaperProps={{
    sx: {
      borderRadius: "8px"
    }
  }}
>
      <Paper className="Items" style={{
    width: "100%",
    padding: "4px",
    // border: "1px solid red",
    backgroundColor: "white",
    border: "2px solid #f6f5f4",
    borderRadius: "8px",
    overflow: "hidden",
    height:  `200px`,
    minWidth: `280px`,
  }
}>
    <Box sx={{
        width: "100%",
        overflowY: "auto",
        height: "100%",
        backgroundColor: "white",
    }} ref={boxRef}>
         <h5 style={{
                  fontWeight: 400,
                  fontSize: "0.75rem",
                  margin: "8px 0",
                  padding: "0 8px"
                }}>Basic Blocks</h5>
        {items.map((item, key) => {
          return (
           <SelectMenuItem key={key} item={item} onSelect={clearAndSelect} isSelected={(items.indexOf(item) === selectedItem)} />
          );
        })}
    </Box>
       
      </Paper>
</Popover>
    
  );
};

export default SelectMenu;
