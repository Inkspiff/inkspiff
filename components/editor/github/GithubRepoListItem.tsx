import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { ThemeContext } from "@/context/ThemeContext";
import { popupBaseStyle } from "@/config/editor";
import ConnectGithub from "./ConnectGithub";
import GithubRepos from "./GithubRepos";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/firebase";
import GithubInstall from "./GithubInstall";

interface GithubRepoListItemProps {
  repoName: string;
  repoFullName: string;
  onLoading: (val: boolean) => void;
  onSetRepo: () => void
}

const GithubRepoListItem = ({
  repoFullName,
  repoName,
  onLoading,
}: GithubRepoListItemProps) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter();
  const app = useSelector((state: RootState) => state.app);

  const { markdownSelected } = app;

  const [adding, setAdding] = useState(false);

  const handleAddRepo = async () => {
    setAdding(true);

    const response = await fetch("/api/db/automation/set-file-automation", {
      body: JSON.stringify({
        mdID: markdownSelected,
        provider: "github",
        repo: repoFullName,
        type: "manual",
        updateEvery: null,
      }),
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    setAdding(false);

    if (!response?.ok) {
      console.log("failed ok");
      if (response.status === 402) {
        console.log("failed error");
        return;
      }
      return;
    }
  };

  useEffect(() => {
    onLoading(adding);
  }, [adding]);

  return (
    <Paper
      variant="outlined"
      elevation={0}
      sx={{
        px: 1,
        py: 0.5,
        cursor: "pointer",
      }}
      onClick={handleAddRepo}
    >
      {repoName}
    </Paper>
  );
};

export default GithubRepoListItem;
