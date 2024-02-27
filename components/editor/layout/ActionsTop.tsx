import React, { useEffect, useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Badge from "@mui/material/Badge";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import Settings from "@/components/editor/settings/Settings";
import Paper from "@mui/material/Paper";
import Updates from "@/components/editor/updates/Updates";

export default function ActionsTop() {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const app = useSelector((state: RootState) => state.app);

  const { viewSettings, updates } = app;

  const unseeenUpdates = updates.filter((update) => update.seen === false);

  const [updatesAnchorEl, setUpdatesAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const handleCreateNew = () => {
    if (session) {
      router.push("/create-new");
    } else {
      dispatch(appActions.toggleOpenLoginModal());
    }
  };

  const handleOpenSettings = () => {
    dispatch(appActions.setPopup("settings"));
  };

  const handleCloseSettings = () => {
    dispatch(appActions.setPopup(""));
  };

  const handleToggleShowUpdates = (event: React.MouseEvent<HTMLElement>) => {
    setUpdatesAnchorEl(updatesAnchorEl ? null : event.currentTarget);
  };

  return (
    <Box
      sx={{
        // border: "1px solid red",
        py: 3,
      }}
    >
      <List>
        <ListItem
          disablePadding
          sx={{
            //  border: "1px solid red",
            p: 0,
            m: 0,
          }}
        >
          <ListItemButton
            sx={{
              //  border: "1px solid blue",
              p: "4px",

              m: 0,
              cursor: "pointer",
              borderRadius: "4px",
            }}
            onClick={handleToggleShowUpdates}
          >
            <AccessTimeRoundedIcon
              sx={{
                mx: 1,
                width: 16,
                height: 16,
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                p: 0,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                Update
              </Typography>

              {unseeenUpdates.length > 0 && (
                <Badge
                  badgeContent={unseeenUpdates.length}
                  color="error"
                  sx={{
                    ml: 2,
                    // border: "1px solid red",
                    "& .MuiBadge-badge": {
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      lineHeight: "16px",
                      // border: "1px solid blue",
                    },
                  }}
                />
              )}
            </Box>
          </ListItemButton>
        </ListItem>

        <Updates anchorEl={updatesAnchorEl} onClose={handleToggleShowUpdates} />

        <ListItem
          disablePadding
          sx={{
            //  border: "1px solid red",
            p: 0,
            m: 0,
          }}
        >
          <ListItemButton
            sx={{
              //  border: "1px solid blue",
              p: "4px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
            onClick={handleOpenSettings}
          >
            <SettingsOutlinedIcon
              sx={{
                mx: 1,
                width: 16,
                height: 16,
              }}
            />

            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              Settings
            </Typography>
          </ListItemButton>
        </ListItem>
        <Settings />

        <ListItem
          disablePadding
          sx={{
            //  border: "1px solid red",
            p: 0,
            m: 0,
          }}
        >
          <ListItemButton
            sx={{
              //  border: "1px solid blue",
              p: "4px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
            onClick={handleCreateNew}
          >
            <AddCircleOutlineOutlinedIcon
              sx={{
                mx: 1,
                width: 16,
                height: 16,
              }}
            />

            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              New file
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
