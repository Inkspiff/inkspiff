import React, { useEffect, useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { FileType } from "@/types/editor";
import FileMore from "@/components/editor/files/FileMore";
import Loading from "@/components/ui/Loading";

export default function FileList() {
  const theme = useTheme();
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const app = useSelector((state: RootState) => state.app);
  const { fileList, markdown, markdownSelected } = app;
  const [loadingFiles, setLoadingFiles] = useState(false);

  const handleOpenFile = (id: string, title: string) => {
    if (markdownSelected !== id) {
      router.replace(
        {
          pathname: "/editor/[markdown-slug]",
          query: {
            "markdown-slug": `${title.split(" ").join("-")}-${id}`,
          },
        },
        `/editor/${title.split(" ").join("-")}-${id}`,
        {
          shallow: true,
        }
      );
      
      dispatch(appActions.updateMarkdownSelected(id));
    }
  };

  useEffect(() => {
    const getFileList = async () => {
      setLoadingFiles(true);
      const response = await fetch("/api/db/get-user-md-ids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session!.user.id,
        }),
      });

      setLoadingFiles(false);

      if (!response?.ok) {
        console.log("failed ok");
        if (response.status === 402) {
          console.log("failed 402");
          return <>fAILED</>;
        }

        return <>Failed</>;
      }

      const files = await response.json();

      dispatch(appActions.updateFileList(files));
    };

    if (session) {
      
      getFileList();
    }
  }, []);

  if (loadingFiles) {
    return (
      <Loading
        innerSx={{
          fontSize: "1rem",
        }}
      />
    );
  }

  if (!loadingFiles && fileList.length === 0) {
    return (
      <Box
        sx={{
          // border: "4px solid purple",
          height: "100%",
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
          }}
        >
          No files found.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <List
        sx={{
          mb: 4,
          px: "4px",
          marginLeft: 0,
          //   border: "1px solid blue",
        }}
      >
        {fileList.map((file, index) => (
          <ListItem
            key={file.id}
            disablePadding
            sx={{
              //  border: "1px solid red",
              p: 0,
              m: 0,
              marginLeft: 0,
              paddingLeft: 0,
              borderRadius: "4px",
              bgcolor: markdownSelected === file.id ? "action.hover" : "",
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <ListItemButton
              sx={{
                //  border: "1px solid blue",
                //  p: "4px",
                px: 1,
                m: 0,
                cursor: "pointer",
                borderRadius: "4px",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                handleOpenFile(file.id, file.title);
              }}
            >
              <ListItemIcon
                sx={{
                  //  border: "1px solid blue",
                  p: 0,
                  margin: 0,

                  mr: 1,
                  minWidth: "0",
                }}
              >
                {<ChevronRightRoundedIcon />}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    {file.title}
                  </Typography>
                }
                sx={{
                  //  border: "1px solid blue",
                  p: 0,
                  m: 0,
                }}
              />
            </ListItemButton>

            <FileMore file={file} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
