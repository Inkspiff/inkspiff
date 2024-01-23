
import React, { useCallback, useEffect, useState } from 'react'
import { EditorState, Text, EditorSelection } from '@codemirror/state'
// import { EditorView } from '@codemirror/view'
import {undo, redo} from '@codemirror/commands'
import useCodeMirror from '@/hooks/use-codemirror'
import Box from "@mui/material/Box"
import { blockRequiresNewLine, getCaretCoordinates } from '@/lib/utils'
import SelectMenu from "@/components/editor/blocks/SelectMenu"
import { BlockSelectItemType } from '@/types/editor'
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useRouter } from "next/router"
import BottomPanel from "@/components/editor/layout/BottomPanel";



const SectionEditor = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch()

  const app = useSelector((state: RootState) => state.app)
  const {selectedSection, addedSections, editorAction} = app
  const {content, name, id} = selectedSection!
  
  const [currentLine, setCurrentLine] = useState(1)

   const [selectMenuIsOpen, setSelectMenuIsOpen] = useState<boolean>(false);
  const [selectMenuPosition, setSelectMenuPosition] = useState<{
    x: number | null;
    y: number| null;
  }>({
    x: null,
    y: null,
  });

  const handleDocChange = useCallback((newState: EditorState) => {
    const newCurrentLine = newState.doc.lineAt(newState.selection.main.head).number
    setCurrentLine(newCurrentLine)
    dispatch(appActions.updateSelectedSectionContent(newState.doc.toString()))
  }, [])



  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: content,
    onChange: handleDocChange, 
     // extensions: [history()] 
  })


  useEffect(() => {
    if (editorView) {
      // Do nothing for now
    } else {
      // loading editor
    }
  }, [editorView])


  const updateEditorContent = useCallback((newContent: string, from: number, to:number) => {
    if (editorView) {
      const state = editorView.state;
      
      const transaction = state.update({
        changes: {
          from: from,
          to: to,
          insert: newContent,
        },
      });

      editorView.dispatch(transaction);
    }
  }, [editorView]);

  

  const keyUpHandler = (e: React.KeyboardEvent) => {
    if (e.key === "/") {
      openSelectMenuHandler();
    }
  }


  const openSelectMenuHandler = () => {
    const { x, y } = getCaretCoordinates();
    setSelectMenuIsOpen(true)
    setSelectMenuPosition({ x: x!, y: y! })
    document.addEventListener("click", closeSelectMenuHandler);
  }


  const closeSelectMenuHandler = () => {
    setSelectMenuIsOpen(false);
    setSelectMenuPosition({ x: null, y: null });
    
    document.removeEventListener("click", closeSelectMenuHandler);
  }

  // console.log(content.replace(/\/$/, ""), {currentLine})

  const blockSelectionHandler = (block: BlockSelectItemType) => {
    // get head
    if (editorView) {
      const {from, to, head, anchor} = editorView.state.selection.ranges[0]

      console.log("blockSelectionHandler", {from, to, head, anchor})

        // TODO: Remove the last character -> / .replace(/\/$/, "")
        const splitContent = content.split("\n")
        console.log({splitContent})

        if (blockRequiresNewLine(block.tag)) {
          const contentUntilLine = splitContent.slice(0, currentLine)
          console.log({contentUntilLine})

          const numberOfCharsUntilLine = contentUntilLine.join("\n").length
          console.log(numberOfCharsUntilLine)

          const usableFromValue = numberOfCharsUntilLine <= 0 ? 0 : numberOfCharsUntilLine - 1

          updateEditorContent((((content.trim() === "/") ? "" : "\n\n") + block.content), usableFromValue, numberOfCharsUntilLine)

          // Set the cursor position using EditorSelection
          const newSelection = EditorSelection.single((numberOfCharsUntilLine == 1) ? block.content.length: numberOfCharsUntilLine + block.content.length + 1 - 1);
          editorView.dispatch({
            selection: newSelection,
          });
        } else {
          // splitContent[currentLine - 1] += block.content
          updateEditorContent(block.content, from - 1, to) // -1 removes the slash
          // Set the cursor position using EditorSelection
          const newSelection = EditorSelection.single(to + block.content.length - 1);
          
          editorView.dispatch({
            selection: newSelection,
          });
        }

        
        closeSelectMenuHandler();
    }
  }

  const handleUndo = () => {
    if (editorView) {
      undo({
        state: editorView.state,
        dispatch: editorView.dispatch,
      })
    }
    
  };
  
  const handleRedo = () => {
    if(editorView){
      redo({
        state: editorView.state,
        dispatch: editorView.dispatch,
      })
    }
  };

  

  return <Box  sx={{
    position: "relative",
    border: "1px solid red"
  }}
  //  key={markdown.content}
   >
    <Box  component="div" className="Page" sx={{
    // px: {xs: "8px", sm: "16px", },
    // py: {xs: "8px", sm: "16px", },
    // pl: {xs: "calc(16px + 48px)", sm: "calc(32px + 48px)",},
    // position: "relative",
    // border: "1px solid red",
  }}
  // key={markdown.content}
  ref={refContainer}
  
  onKeyUp={ keyUpHandler}>

    </Box>    
          <SelectMenu
            open={selectMenuIsOpen}
            position={selectMenuPosition}
            onSelect={blockSelectionHandler}
            close={closeSelectMenuHandler}
          />

          <BottomPanel
            onSelectBlock={blockSelectionHandler}
            onUndo={handleUndo}
            onRedo={handleRedo}
          />
  </Box>
}

export default SectionEditor
