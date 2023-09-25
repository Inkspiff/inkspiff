// ThemeContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { Theme as MuiTheme, createTheme, ThemeOptions, Palette as MuiPalette} from '@mui/material/styles';
import { lightTheme, darkTheme, SUPPORTED_THEMES } from '@/config/theme';



interface Theme extends MuiTheme {
    myCustomThemeType: string;
}
  

type ThemeContextType = {
  theme: MuiTheme;
  switchTheme: (name: string) => void;
  toggleTheme: () => void;
};

// const defaultTheme = createTheme(); // creates a default theme

export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  switchTheme: (name: string) => {},
  toggleTheme: () => {},
});


type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(lightTheme);

  const switchTheme = (name: string) => {
    const newThemeObj = SUPPORTED_THEMES.filter(themeObj => themeObj.name === name)[0]
    setTheme(newThemeObj.theme)
  };

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  }


  return (
    <ThemeContext.Provider value={{ theme, switchTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
