import React, { useContext, useState, ChangeEvent, useEffect } from "react";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useSession, signIn } from "next-auth/react";
import { sign } from "crypto";

const ConnectGithub = () => {
  const { data: session } = useSession();
  const app = useSelector((state: RootState) => state.app);

  const [isGithubLinked, setIsGitHubLinked] = useState(false);

  const { markdownSelected } = app;

  const connectGithub = async () => {
    // Use the signIn function to initiate the GitHub sign-in

    if (typeof window === undefined) return;

    await signIn("github", {
      redirect: false,
      callbackUrl: `/?activeUserId=${session?.user.id}`,
    });
  };

  return (
    <>
      <Button
        href={`https://github.com/apps/inkspiff-github-agent/installations/new?state=${
          session!.user.id
        }__${markdownSelected}`}
      >
        Install App
      </Button>

      <Button
        href={`https://github.com/login/oauth/authorize?scope=user:${
          session!.user.id
        }&client_id=<%= client_id %>`}
      >
        Click here to begin!
      </Button>

      <Button onClick={connectGithub}>Connect Github</Button>
    </>
  );
};

export default ConnectGithub;
