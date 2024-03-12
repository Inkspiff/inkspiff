import React, { useContext, useState, ChangeEvent, useEffect } from "react";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useSession, signIn } from "next-auth/react";

const ConnectGithub = () => {
  const { data: session } = useSession();
  const app = useSelector((state: RootState) => state.app);

  const connectGithub = async () => {
    // Use the signIn function to initiate the GitHub sign-in

    if (typeof window === undefined) return;

    if (!session) return

    await signIn("github", {
      redirect: false,
      callbackUrl: `/?activeUserId=${session?.user.id}`,
    });
  };

  return (
    <>

      <Button onClick={connectGithub}>Connect Github</Button>
    </>
  );
};

export default ConnectGithub;
