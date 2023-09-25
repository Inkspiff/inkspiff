import React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface ColorModeContextType {
    toggleColorMode: () => void;
  }
  
export const ColorModeContext = React.createContext<ColorModeContextType>({
toggleColorMode: () => {},
});

interface propTypes {
    children: React.ReactNode
}

export default function ColorModeContextProvider({children}: propTypes) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return <ColorModeContext.Provider value={colorMode}>
      {children}
    </ColorModeContext.Provider>
}

