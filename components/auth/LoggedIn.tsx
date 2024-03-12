import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserAuthForm } from "@/components/auth/user-auth-form";
import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import { getServerSession } from "next-auth/next";
import { getProviders } from "next-auth/react";
import { authOptions } from "@/lib/auth";
import { Session } from "next-auth";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import AddNames from "./AddNames";
import ConnectGithub from "../editor/github/ConnectGithub";
import Button from "@mui/material/Button";

const LoggedIn = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    return <></>;
  }

  const user = session?.user;

  if (user.name === null || user.name === undefined || user.name === "") {
    return <AddNames />;
  }

  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "1.25rem", sm: "1.5rem" },
          lineHeight: { xs: "1.25rem", sm: "1.5rem" },
          mb: 1,
        }}
      >
        Hey, {session.user.name!.split(" ")[0]}{" "}
      </Typography>

      <Box
        sx={{
          width: "80px",
          height: "80px",
          position: "relative",
          mb: 1,
          borderRadius: "50%",
          display: "inline-block",
          overflow: "hidden",

          "& img": {
            objectFit: "contain",
          },
        }}
      >
        {session.user.image! && (
          <Image
            alt={`${session.user.name!} github`}
            src={session.user.image!}
            fill
          />
        )}
      </Box>

      <Typography
        variant="body1"
        sx={{
          mb: 1,
        }}
      >
        You&apos;re already logged in to your account
      </Typography>

      <Typography
        variant="body1"
        sx={{
          "& a": {
            color: "#121212",
          },
        }}
      >
        <Link href="/editor">Go to Editor</Link>
      </Typography>

      <ConnectGithub />

      <Button onClick={() => signOut()}>Sign out</Button>
    </Box>
  );
};

export default LoggedIn;
