
import React, { useCallback, useEffect, useState } from 'react'
import { EditorState,  Text, EditorSelection } from '@codemirror/state'
// import { EditorView } from '@codemirror/view'
import {undo, redo} from '@codemirror/commands'
import useCodeMirror from '@/hooks/use-codemirror'
import Box from "@mui/material/Box"
import { blockRequiresNewLine, getCaretCoordinates, getSectionFromLine } from '@/lib/utils'
import SelectMenu from "@/components/editor/blocks/SelectMenu"
import { BlockSelectItemType } from '@/types/editor'
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useRouter } from "next/router"
import BottomPanel from "@/components/editor/layout/BottomPanel";




interface Props {
  initialDoc: string,
  // onChange: (doc: EditorState) => void,
}

const Editor: React.FC<Props> = (props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch()

  const app = useSelector((state: RootState) => state.app)
  const {editorAction, markdown, viewSettings, markdownSelected, saveStates, addedSections } = app
  const {content: doc, currentLine} = markdown
  const {fullscreen} = viewSettings
   const [selectMenuIsOpen, setSelectMenuIsOpen] = useState<boolean>(false);
  const [selectMenuPosition, setSelectMenuPosition] = useState<{
    x: number | null;
    y: number| null;
  }>({
    x: null,
    y: null,
  });


  // const [selectMenuAnchorEl, setSelectMenuAnchorEl] = useState<null | HTMLElement>(null)
  // const id = open ? 'select-popover' : undefined;
  const { initialDoc} = props

  const handleDocChange = useCallback((newState: EditorState) => {
    const newCurrentLine = newState.doc.lineAt(newState.selection.main.head).number
    dispatch(appActions.changeMarkdown({
      content: newState.doc.toString(),
      currentLine: newCurrentLine
    }))
  }, [])

 

  useEffect(() => {
    const saveMd = async () => {
      dispatch(appActions.updatedSaveStates({
        saving: true,
        saveFailed: false
      }))

      console.log("about to fetch save")

      const response = await fetch("/api/db/update-md-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session!.user.id,
          mdId: markdown.id,
          content: markdown.content,
          currentLine: markdown.currentLine
        })
      })


      dispatch(appActions.updatedSaveStates({
        saving: false,
        saveFailed: false
      }))

      if (!response?.ok) {
        dispatch(appActions.updatedSaveStates({
          saving: false,
          saveFailed: true
        }))
        if (response.status === 402) {
          return 
        }
        return
      }

    }

    if (session) {
      if (markdown.id) {
        // if (editorView) {
        //   editorView.setState(EditorState.create({doc}));
        // } 
        // updateEditorContent(markdown.content, 0, markdown.content.length - 1)
          saveMd()
      }
    }

    // updateEditorContent(doc)

  }, [doc])


  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: initialDoc,
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

  // console.log({currentLine: markdown.currentLine})
  
  const blockSelectionHandler = (block: BlockSelectItemType) => {
    // get head
    if (editorView) {
      const {from, to, head, anchor} = editorView.state.selection.ranges[0]

      console.log("blockSelectionHandler", {from, to, head, anchor})

        // TODO: Remove the last character -> /
        const splitContent = markdown.content.split("\n")
        console.log({splitContent})

        if (blockRequiresNewLine(block.tag)) {
          const contentUntilLine = splitContent.slice(0, markdown.currentLine)
          console.log({contentUntilLine})

          const numberOfCharsUntilLine = contentUntilLine.join("\n").length
          console.log(numberOfCharsUntilLine)

          const usableFromValue = numberOfCharsUntilLine <= 0 ? 0 : numberOfCharsUntilLine - 1

          updateEditorContent((((markdown.content.trim() === "/") ? "" : "\n\n") + block.content), usableFromValue, numberOfCharsUntilLine)
          // Set the cursor position using EditorSelection
          const newSelection = EditorSelection.single((numberOfCharsUntilLine == 1) ? block.content.length: numberOfCharsUntilLine + block.content.length + 1 - 1);
          editorView.dispatch({
            selection: newSelection,
          });
        } else {
          // splitContent[markdown.currentLine - 1] += block.content
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

  useEffect(() => {
    
    switch(editorAction) {
      
      case "undo": 
        handleUndo()
        break;
      case "redo":
        handleRedo()
        break;
      default:
        break;
    }

    if (editorAction !== "") {
      dispatch(appActions.setEditorAction(""))
    }
    
    
  }, [editorAction])

  

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

export default Editor