import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { ThemeContext } from "@/context/ThemeContext";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import { DocumentData, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import GithubRepoListItem from "./GithubRepoListItem";
import { GithubRepoType } from "@/types/github";

interface GithubReposProps {
  userDoc: DocumentData | undefined;
  onSetRepo: (val: boolean) => void
}

const GithubRepos = ({ userDoc, onSetRepo }: GithubReposProps) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter();
  const app = useSelector((state: RootState) => state.app);
  const [loading, setLoading] = useState(false);

  const { markdownSelected } = app;

  

  const [ghRepos, setGhRepos] = useState<GithubRepoType[]>([]);

  const [selected, setSelected] = useState(false)

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      if (session!.user.githubUsername && session!.user.ghInstallationId) {
        const data = {
          username: session!.user.githubUsername,
          installationId: session!.user.ghInstallationId,
        };

        const response = await fetch("/api/github/fetch-repos", {
          body: JSON.stringify(data),
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        setLoading(false);

        if (!response?.ok) {
          console.log("failed ok");
          if (response.status === 402) {
            console.log("failed error");
            return;
          }
          return;
        }

        const repos = await response.json();
        setGhRepos(repos);
      }
    };

    if (userDoc?.ghInstallationId) {
      fetchRepos();
    }
  }, [userDoc]);

  const handleSetRepo = () =>{ 
    onSetRepo(true)
  }

  

  return (
    <Box
      sx={{
        py: 2,
        maxHeight: "100%",
        overflow: "hidden",
        border: "1px solid blue",
      }}
    >
      {loading && <Box>Loading</Box>}

      

      <Box> 
        <Box
        sx={{
          height: "40px",
        }}
      >
        You repos:
      </Box>
      {(ghRepos.length > 0 ) && (
        <Box
          sx={{
            height: "calc(100% -  40px)",
            display: "flex",
            whiteSpace: "nowrap",
            wordBreak: "break-word",
            flexWrap: "wrap",
            gap: 2,
            border: "1px solid red",
            overflowY: "auto",
          }}
        >
          {ghRepos!.map((repo, index) => {
            return (
              <GithubRepoListItem
                key={index}
                repoName={repo.repoName}
                repoFullName={repo.repoFullName}
                onLoading={setSelected}
                onSetRepo={handleSetRepo}
              />
            );
          })}
        </Box>
      )}
      {(ghRepos.length < 1) && <>No Repos</>}

      </Box>
      
    </Box>
  );
};

export default GithubRepos;
