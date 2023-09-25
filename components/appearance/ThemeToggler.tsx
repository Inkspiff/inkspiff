// components/ThemeToggler.tsx
import { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Switch from "@mui/material/Switch";
import { ThemeContext } from '@/context/ThemeContext';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

const ThemeToggler = () => {
  const { toggleTheme, theme} = useContext(ThemeContext);

  const {palette, } = theme
  const {mode } = palette


  return (
    <IconButton onClick={toggleTheme}>
      {mode === 'light' ? < LightModeOutlinedIcon  /> : <DarkModeOutlinedIcon />}
    </IconButton>
  );
};

export default ThemeToggler;
