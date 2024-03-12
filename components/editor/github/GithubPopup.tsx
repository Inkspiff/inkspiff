import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { popupBaseStyle } from "@/config/editor";
import ConnectGithub from "./ConnectGithub";
import GithubRepos from "./GithubRepos";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/firebase";
import GithubInstall from "./GithubInstall";
import { useEffect, useMemo, useState } from "react";
import { Typography } from "@mui/material";

const GithubPopup = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter();
  const app = useSelector((state: RootState) => state.app);

  const [showRepos, setShowRepos] = useState(false);

  const { markdownSelected, viewSettings } = app;

  const userRef = session ? doc(db, "users", session.user.id) : null;
  const mdRef = markdownSelected
    ? doc(db, "markdowns", markdownSelected)
    : null;

  const [userDoc] = useDocumentData(userRef);
  const [mdDoc] = useDocumentData(mdRef);

  const open = viewSettings.popup === "github";

  const handleClose = () => {
    dispatch(appActions.setPopup(""));
  };

  useEffect(() => {
    if (mdDoc?.automation) {
      setShowRepos(false);
    } else {
      setShowRepos(true);
    }
  }, [mdDoc]);

  const handleChangeRepo = () => {
    setShowRepos(true);
  };

  console.log(mdDoc);

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
            {!userDoc?.githubUsername && <ConnectGithub />}

            {!userDoc?.ghInstallationId && userDoc?.githubUsername && (
              <GithubInstall
                userID={session?.user.id}
                markdownID={markdownSelected}
              />
            )}

            {userDoc?.ghInstallationId && showRepos && (
              <GithubRepos userDoc={userDoc} onSetRepo={setShowRepos} />
            )}

            {mdDoc?.automation && !showRepos && (
              <Box sx={{ textAlign: "center" }}>
                We are in! ha ha ha
                <Typography>repo: {mdDoc?.automation.repo}</Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

export default GithubPopup;
