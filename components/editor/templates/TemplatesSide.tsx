import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NameEmail from "@/components/account/NameEmail";
import Input from "@mui/material/Input";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import ViewTemplateInEditor from "@/components/editor/templates/ViewTemplateInEditor";
import TemplateFilterSelect from "@/components/templates-page/TemplateFilterSelect";
import { ThemeContext } from "@/context/ThemeContext";
import TemplatesList from "@/components/editor/templates/TemplatesList";
import { matchSorter } from "match-sorter";
import { TemplateType } from "@/types";
import { popupBaseStyle } from "@/config/editor";

const TEMPLATE_CATEGORIES = ["profile", "website", "blog", "package"];

export default function TemplatesSide() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const app = useSelector((state: RootState) => state.app);
  const { toggleTheme, theme } = useContext(ThemeContext);

  const [space, setSpace] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<TemplateType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const { palette } = theme;
  const { mode } = palette;
  const { templates } = app;

  const handleSelectCategory = (index: number) => {
    setSearchValue(TEMPLATE_CATEGORIES[index]);
  };

  return (
    <>
      <Box>
        <Typography
          variant="body2"
          component="h4"
          sx={{
            px: 2,
            mb: 1,
          }}
        >
          {" "}
          Suggestions
        </Typography>
        <List>
          {TEMPLATE_CATEGORIES.map((category, index) => {
            return (
              <ListItem
                key={index}
                sx={{
                  // border: "1px solid red",
                  p: 0,
                  m: 0,
                  px: "4px",
                }}
              >
                <ListItemButton
                  sx={{
                    // border: "1px solid blue",
                    p: "2px 12px",
                    m: 0,
                    borderRadius: "6px",
                  }}
                  onClick={() => {
                    handleSelectCategory(index);
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          // border: "1px solid red",
                          p: 0,
                          m: 0,
                          textTransform: "capitalize",
                        }}
                      >
                        {category}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </>
  );
}
