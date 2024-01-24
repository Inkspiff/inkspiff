import React, {useState} from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from "next/link"
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function TitleSpace() {
  const router = useRouter()
  const { data: session } = useSession();
  const dispatch = useDispatch()
    const app = useSelector((state: RootState) => state.app)
    const {markdown, saveStates, selectedSection, viewSettings} = app

    const {sidebar} = viewSettings
    const {saving, saveFailed} = saveStates

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(appActions.updateMarkdownTitle(e.target?.value!))
    }


    const updateMdTitle = async (title: string) => {
      dispatch(appActions.updatedSaveStates({
        saving: true,
        saveFailed: false
      }))


      const response = await fetch("/api/db/update-md-title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session!.user.id,
          mdId: markdown.id,
          newTitle: title
        })
      })

      dispatch(appActions.updatedSaveStates({
        saving: false,
        saveFailed: false
      }))
          
      if (!response?.ok) {
        if (response.status === 402) {
          dispatch(appActions.updatedSaveStates({
            saving: false,
            saveFailed: true
          }))
          return 
        }
  
        return 
      }

      console.log("mdTitle: ", title)

      dispatch(appActions.updateFileTitle({
        id: markdown.id,
        title: title
      }))

      router.push({
        pathname: '/editor/[markdown-id]',
        query: {
          'markdown-id' : router.query['markdown-id'],
        },
      }, 
      `/editor/${title.split(" ").join("-")}-${markdown.id}`,
      {
        shallow: true
      })
    }

    const handleLostFocus = async (e: React.FocusEvent<HTMLDivElement>) => {


      console.log("verify title", e.target.innerText)
      if (e.target.innerText.trim() !== markdown.title) {
        dispatch(appActions.updateMarkdownTitle(e.target.innerText))

        setTimeout(() => {
          if (session) {
            if (!saving) {
            
              updateMdTitle(e.target.innerText)
            }
          } else {
            dispatch(appActions.updateFileList([
              {
                id: "",
                title: e.target.innerText.trim(),
              }
            ]))
          }
          
        }, 0)
      }
     
      

    }

    const breadcrumbs = [
        <Typography key="1" variant="body1">
          {markdown.title}
        </Typography>
    ]


  return (
    <Stack spacing={2} sx={{
      // color: "#121212"
      // border: "1px solid red",
      ml: 0.5,
    }}>
      {!sidebar && <Box component="div" 
      contentEditable 
      suppressContentEditableWarning
      // onChange={handleChange} 
      onBlur={handleLostFocus} sx={{
        // border: "1px solid red",
        outline: "none",
        fontSize: "16px",
        width: "auto",
        borderRadius: "4px",
        p: "0px 8px",
        "&:hover" : {
          bgcolor: "action.hover"
        }
      }}>{markdown.title}</Box>}

{sidebar && <Box component="div" 
       sx={{
        // border: "1px solid red",
        outline: "none",
        fontSize: "16px",
        width: "auto",
        borderRadius: "4px",
        p: "0px 8px",
      }}>{selectedSection ? `${selectedSection.name} - Section View` : "No Section"}</Box>}


      {/* <Breadcrumbs 
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs> */}
    </Stack>
  );
}