import React, {useState, useCallback, useEffect} from 'react'
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, } from "next-auth/react";
import { useRouter } from "next/router"
import Preview from '../Preview'
import Editor from "@/components/editor/Editor"
import SectionEditor from "@/components/editor/sections/SectionEditor"
import Blocks from "@/components/editor/block-view/Blocks"
import NoSections from "@/components/editor/sections/NoSections"

const View = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)
  const {markdown, viewSettings, markdownSelected, saveStates, selectedSection } = app
  const {content: doc, currentLine} = markdown
  const {fullscreen, sidebar, blocks: blocksView} = viewSettings
  const [saveTimestamp, setSaveTimestamp] = useState<number>(0)
  const [saveFailed, setSaveFailed] = useState<boolean>(false)
  const [saving, setSaving] = useState<boolean>(false)
  const [showRender, setShowRender] = useState<boolean>(false)
  const [loadingMarkdown, setLoadingMarkdown] = useState<boolean>(false)

  const handleSwitchView = () => {
    setShowRender(prev => !prev)
  }

  
  const fetchMarkdown = async (id: string) => {
    setLoadingMarkdown(true)

    const response = await fetch("/api/db/get-md", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mdId: id,
      })
    })

    setLoadingMarkdown(false)

    if (!response?.ok) {

      if (response.status === 402) {
        // return <>fAILED</>
      }
      // return <>Failed</>
    }

    const md = await response.json()
        
    dispatch(appActions.updateMarkdown({
      id: md.id,
      title: md.title,
      content: md.content,
      currentLine: md.currentLine,
      lastEdited: md.lastEdited ? md.lastEdited.seconds : undefined,
      admin: md.admin,
      allowedUsers: md.allowedUsers,
      visibility: md.visibility,
    }))
  }

  useEffect(() => {
    // console.log("-selected-", markdownSelected)
    if (session) {
      if (markdownSelected.trim() !== "") {
        fetchMarkdown(markdownSelected)
      }
    }
    
  }, [markdownSelected])
  

  if (loadingMarkdown) {
    return <Box>Loading</Box>
  }


  

  return (

    <Grid container sx={{
      border: "2px solid purple",
      height: "100%",
      // overflow: "hidden",
      position: "relative",
      width: "100%",
    
    }}>

     
        <Grid item xs={12} sm={(fullscreen ? 12 : 6)} md={(fullscreen ? 12 : 6)} sx={{
          // outline: "1px solid blue",
          height: {xs: "auto", md: "100%"},
          minHeight: {xs: "auto", md: "calc(100vh - 64px)"},
          overflowY: {xs: "auto", sm: "scroll"},
      
        }}>
          {(sidebar && selectedSection) && <SectionEditor key={selectedSection.id} />}
          {(sidebar && !selectedSection) && <NoSections />}
        {(!sidebar && !blocksView) && <Editor key={markdown.id} initialDoc={doc} />}
        {(!sidebar && blocksView) && <Blocks />}
  
        </Grid>
        <Grid item xs={12} sm={(fullscreen ? 12 : 6)} md={(fullscreen ? 12 : 6)} sx={{
          // outline: "1px solid red",
          height: {xs: "auto", md: "100%"},
          // minHeight: "50vh",
          overflowY: {xs: "auto", sm: "scroll"},
        }}>
       <Preview doc={doc} />
        </Grid>
    </Grid>
    
  )
}

export default View

