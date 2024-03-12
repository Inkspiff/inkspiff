import React, { useContext, useState, ChangeEvent, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { ThemeContext } from "@/context/ThemeContext";
import { popupBaseStyle } from "@/config/editor";
import { set } from "react-hook-form";
import Preview from "../layout/Preview";
import Input from "@mui/material/Input";
import GithubUsername from "./GithubUsername";
import AddGithubRepo from "./AddGithubRepo";
import GithubInstall from "./GithubInstall";
import ConnectGithub from "./ConnectGithub";
import Repos from "./Repos";

const GithubPopup = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter();
  const app = useSelector((state: RootState) => state.app);
  const { toggleTheme, theme } = useContext(ThemeContext);

  const { markdown } = app;
  const [ghRepos, setGhRepos] = useState("");

  const { palette } = theme;
  const { mode } = palette;

  const {
    markdown: { content, title, automation },
    viewSettings,
    markdownSelected,
  } = app;

  const open = viewSettings.popup === "github";

  const handleClose = () => {
    dispatch(appActions.setPopup(""));
  };

  console.log({ automation });

  console.log({GithubUsername: session?.user?.githubUsername});

  console.log({session})

  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Paper
          sx={{
            ...popupBaseStyle,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              p: 2,
            }}
          >

            <ConnectGithub />

            <Repos />
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

export default GithubPopup;
