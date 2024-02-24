import React, { useState, useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Preview from "./Preview";
import Editor from "@/components/editor/layout/Editor";
import SectionEditor from "@/components/editor/sections/SectionEditor";
import Blocks from "@/components/editor/block-view/Blocks";
import NoSections from "@/components/editor/sections/NoSections";
import Loading from "@/components/ui/Loading";
import { Typography } from "@mui/material";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc as firebaseDoc } from "firebase/firestore";
import { db } from "@/firebase";

const View = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const app = useSelector((state: RootState) => state.app);
  const {
    markdown,
    viewSettings,
    markdownSelected,
    saveStates,
    fileList,
    selectedSection,
    loadingFile,
  } = app;
  const { content: doc, content, lastEditedBy } = markdown;
  const { fullscreen, sidebar, blocks: blocksView } = viewSettings;

  const mdRef = markdownSelected
    ? firebaseDoc(db, "markdowns", markdownSelected)
    : null;
  const [mdDoc] = useDocumentData(mdRef);

  useEffect(() => {
    console.log({ markdownSelected });
    if (markdownSelected) {
      dispatch(appActions.setLoadingFile(true));
    }
  }, [markdownSelected]);

  

  useEffect(() => {
    if (mdDoc) {
      dispatch(appActions.setLoadingFile(false));

      if (session) {
          dispatch(
            appActions.updateMarkdown({
              id: markdownSelected,
              title: mdDoc.title,
              content: mdDoc.content,
              currentLine: mdDoc.currentLine,
              currentHead: mdDoc.currentHead,
              lastEdited: mdDoc.lastEdited ? mdDoc.lastEdited.seconds : 0,
              lastEditedBy: mdDoc.lastEditedBy || "",
              admin: mdDoc.admin,
              memberIDs: mdDoc.membersIDs,
              visibility: mdDoc.visibility,
              github: mdDoc.github,
            })
          );
      }
    }
  }, [mdDoc]);

  if (loadingFile || !mdDoc) {
    return <Loading />;
  }

  if (!markdownSelected && fileList.length === 0) {
    // markdown selected and user has not files
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Typography>You've got no markdowns</Typography>
      </Box>
    );
  }

  if (!markdownSelected) {
    // markdown is not selected and user has files
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Typography>No Markdown Selected</Typography>
      </Box>
    );
  }

  return (
    // markdown is selected and user has file

    <Grid
      container
      sx={{
        // border: "4px solid purple",
        height: "100%",
        overflowY: "auto",
        position: "relative",
        width: "100%",
      }}
    >
      <Grid
        item
        xs={12}
        sm={fullscreen ? 12 : 6}
        sx={{
          // border: "2px solid blue",
          height: { xs: "50%", sm: fullscreen ? "auto" : "100%" },
          minHeight: {
            xs: "auto",
            sm: fullscreen ? "auto" : "calc(100vh - 64px)",
          },
          overflowY: { xs: "auto", sm: "scroll" },
        }}
      >
        {sidebar && selectedSection && (
          <SectionEditor key={selectedSection.id} />
        )}
        {sidebar && !selectedSection && <NoSections />}
        {!sidebar && !blocksView && (
          <Editor initialDoc={doc}  />
        )}
        {!sidebar && blocksView && <Blocks />}
      </Grid>
      <Grid
        item
        xs={12}
        sm={fullscreen ? 12 : 6}
        sx={{
          // outline: "2px solid red",
          height: { xs: "50%", sm: fullscreen ? "auto" : "100%" },
          minHeight: {
            xs: "auto",
            sm: fullscreen ? "auto" : "calc(100vh - 64px)",
          },
          overflowY: { xs: "auto", sm: "scroll" },
        }}
      >
        <Preview doc={sidebar && !selectedSection ? "" : doc} />
      </Grid>
    </Grid>
  );
};

export default View;
