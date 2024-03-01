import React, { useContext, useState, ChangeEvent, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { useSession, signIn, signOut } from "next-auth/react";
import Input from "@mui/material/Input";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/firebase";

const GithubUsername = () => {
  const { data: session } = useSession();

  const userRef = doc(db, "users", session?.user.id);
  const [data] = useDocumentData(userRef);

  const [_githubUsername, _setGithubUsername] = useState<string>("");
  const [githubUsername, setGithubUsername] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  //   const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setGithubUsername(data.githubUsername || null);
    }
  }, [data]);


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    _setGithubUsername(event.target.value);
  };

  const handleAddUsername = async () => {
    setAdding(true);
    if (session) {
      const response = await fetch("/api/github/save-github-username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          githubUsername: _githubUsername,
        }),
      });

      setAdding(false);

      if (!response?.ok) {
        console.error("Error adding username");
        if (response.status === 402) {
          return 
        }
        return
      }
    }
  };

  return (
    <Box>
      {!githubUsername ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Input onChange={handleInputChange} />

          <Button onClick={handleAddUsername}>Add username</Button>
        </Box>
      ) : (
        <Typography>Connected to {githubUsername}</Typography>
      )}
    </Box>
  );
};

export default GithubUsername;
