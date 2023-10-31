
import React, { useCallback, useEffect, useState } from 'react'
import { EditorState, Text } from '@codemirror/state'
// import { EditorView } from '@codemirror/view'
import useCodeMirror from '@/hooks/use-codemirror'
import Box from "@mui/material/Box"
import { getCaretCoordinates } from '@/lib/utils'
import SelectMenu3 from "@/components/editor/SelectMenu3"
import { SelectMenuItemType } from '@/types/editor'
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useRouter } from "next/router"
import Popover from "@mui/material/Popover"


const AltEditor = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch()

  const app = useSelector((state: RootState) => state.app)
  const {selectedSection, addedSections} = app
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
    dispatch(appActions.updateSectionContent({
        id: id,
        content: newState.doc.toString()
    }))
    // setCurrentLine(newState.doc.lineAt(newState.selection.main.head).number)
  }, [])



  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: content,
    onChange: handleDocChange,  
  })


  const updateEditorContent = useCallback((newContent: string) => {
    if (editorView) {
      const state = editorView.state;
      const transaction = state.update({
        changes: {
          from: 0,
          to: state.doc.length,
          insert: newContent,
        },
      });
      editorView.dispatch(transaction);
    }
  }, [editorView]);

   

//   useEffect(() => {
//     updateEditorContent(content!)
//   }, [content])


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

  
  const blockSelectionHandler = (block: SelectMenuItemType) => {
    const splitContent = content.split("\n")

    splitContent.splice(currentLine, 0, block.content);

    const newContent = splitContent.join("\n")

    // updateEditorContent(newContent)

      dispatch(appActions.changeMarkdown({
        content: newContent,
        currentLine: currentLine + 1,
      }))
    
    closeSelectMenuHandler();
  }

  

  return <Box  sx={{
    position: "relative",
    // border: "1px solid red"
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

    
          <SelectMenu3
            open={selectMenuIsOpen}
            position={selectMenuPosition}
            onSelect={blockSelectionHandler}
            close={closeSelectMenuHandler}
          />
  </Box>
}

export default AltEditor
