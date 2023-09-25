
import React, { useCallback, useEffect, useState } from 'react'
import { EditorState, Text } from '@codemirror/state'
// import { EditorView } from '@codemirror/view'
import useCodeMirror from '@/hooks/use-codemirror'
import Box from "@mui/material/Box"
import { getCaretCoordinates, getSectionFromLine } from '@/lib/utils'
import SelectMenu3 from "@/components/editor/SelectMenu3"
import { SelectMenuItemType } from '@/types/editor'
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useRouter } from "next/router"
import Popover from "@mui/material/Popover"

interface Props {
  initialDoc: string,
  // onChange: (doc: EditorState) => void,
}

const Editor: React.FC<Props> = (props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)
  const {markdown, viewSettings, markdownSelected, saveStates, addedSections } = app
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
    // const section = getSectionFromLine(newCurrentLine)





    // setDoc(newState.doc.toString())
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
          saveMd()
      }
    }

    // updateEditorContent(doc)

  }, [doc])


  // const handleChange = useCallback(
  //   (state: EditorState) => {
  //     // console.log({state})
  //     onChange(state)
  //   },
  //   [onChange]
  // )



  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: initialDoc,
    onChange: handleDocChange,
    
  })

  useEffect(() => {
    if (editorView) {
      // Do nothing for now
    } else {
      // loading editor
    }
  }, [editorView])

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



  const keyUpHandler = (e: React.KeyboardEvent) => {
    if (e.key === "/") {
      openSelectMenuHandler();
    }
  }


  const openSelectMenuHandler = () => {

    const { x, y } = getCaretCoordinates();
    console.log({x, y})
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
    const splitContent = markdown.content.split("\n")

    splitContent.splice(markdown.currentLine, 0, block.content);

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

export default Editor
