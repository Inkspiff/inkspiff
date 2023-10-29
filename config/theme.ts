import { Roboto, Raleway, Merriweather } from 'next/font/google';
import { createTheme, responsiveFontSizes, Theme as MuiTheme, ThemeOptions,  } from '@mui/material/styles';
import { amber, grey, red, deepOrange } from '@mui/material/colors';
import { PaletteMode, } from '@mui/material';
import { deepmerge } from '@mui/utils';
import localFont from 'next/font/local'
    

export const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const raleway = Raleway({
  weight: ['100', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});



// Create a theme instance.
let theme = createTheme();

const myTheme = (theme: MuiTheme):ThemeOptions => {
const {palette} = theme
const {mode} = palette

  return {
    typography: {
      fontFamily: raleway.style.fontFamily,
      h1: {
        
        [theme.breakpoints.up('xl')]: {
          fontSize: "4.78125rem",
          lineHeight: "4.875rem",
          fontFamily: raleway.style.fontFamily,
        },
        [theme.breakpoints.up('xs')]: {
          fontSize: "2.8125rem",
          lineHeight: raleway.style.fontFamily,
        },
      },
      h2: {
        fontWeight: 600,
        marginBottom: "32px",
        [theme.breakpoints.up('xl')]: {
          fontSize: "2.8125rem",
          lineHeight: "3.0625rem",
          fontFamily: raleway.style.fontFamily,
        },
        [theme.breakpoints.up('xs')]: {
          fontSize: "2.25rem",
          lineHeight: "2.5rem",
          fontFamily: raleway.style.fontFamily,
        },
      },
      h3: {
        
        [theme.breakpoints.up('xl')]: {
          fontSize: "1.875rem",
          lineHeight: "2.125rem",
          
        },
        [theme.breakpoints.up('xs')]: {
          fontSize: "1.875rem",
          lineHeight: "2.125rem",
        },
      },
      h4: {
        [theme.breakpoints.up('xl')]: {
          fontSize: "2.25rem",
          lineHeight: "3.0625rem",
        },
        [theme.breakpoints.up('xs')]: {
          fontSize: "1.5rem",
          lineHeight: "2.5rem",
        },
      },
  
      body1: {
        // color: "#8b8b8b"
        fontFamily: raleway.style.fontFamily,
      },
      body2: {
        // color: "#8b8b8b"
        fontFamily: raleway.style.fontFamily,
      }
    },
    components: {
      MuiCssBaseline: {
        
        
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
          }
        }
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            // background: theme.palette.background.default,
          }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: "4px",
            padding: "0",
            "& .MuiMenu-paper": {
              borderRadius: "4px"
            }
          }
        }
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: "none",
            color: "inherit",
          }
        }
      },
      MuiButton: {

        styleOverrides: {
          root: {
              borderRadius: "5px",
              textTransform: "inherit",
              fontSize: "1rem",
              
  
          },
          text: {
            // color: theme.palette.text.primary,
            borderRadius: "8px",
            '&:hover': {
              background: theme.palette.action.hover,
            }
          },
          contained: {
            fontWeight: 500,
            boxShadow: "none",
              // background: theme.palette.text.primary,
              // [theme.breakpoints.down('sm')]: {
              //     fontSize: "1rem",
              // },
              // "&:hover": {
              //   background: theme.palette.action.hover,
              // }
              backgroundColor: theme.palette.mode === 'light' ? '#121212' : '#ffffff',
          },
          outlined: {
              border: `2px solid ${theme.palette.text.primary}`,
              // color: theme.palette.text.primary,
    
              "&:hover": {
                
              }
          }
    
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            padding: "0 4px 0 4px"
          }
        }
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            padding: "0"
          }
        }
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            fontSize: "14px",
            borderRadius: "4px",
            padding: "4px 8px",
            alignItems: "center",
          }
        }
      },
      
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 38,
          height: 20,
          padding: 0,
  
          '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
              transform: 'translateX(16px)',
              color: '#fff',
              '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
              },
              '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
              },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
              color: '#33cf4d',
              border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
              color:
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
          },
          '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 18,
            height: 18,
          },
          '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
              duration: 500,
            }),
          },
          }
          
        }
       
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: "4px",
            // "& .Mui-focusVisible": {
            //   background: "red",
            // },
            // '& .MuiIconButton-edgeStart': {
            //   border: "1px solid red"
            // }
          },
  
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            // borderRadius: "8px",
          }
        }
      }
    }
  }
} 

function createMyTheme(options: Parameters<typeof createTheme>[0], myCustomThemeType: string): MuiTheme {
  let mainTheme = createTheme(options)
  mainTheme = createTheme(deepmerge(mainTheme, myTheme(mainTheme)));
  return { ...mainTheme, myCustomThemeType } as MuiTheme;
}

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      // main: "#90caf9",
      // light: "#e3f2fd",
      // dark: "#42a5f5",
      main: "#121212",
      light: "#414141",
      dark: "#0c0c0c",

    },
    secondary: {
      // main: "#ce93d8",
      // light: "#f3e5f5",
      // dark: "#ab47bc",
      main: "#b2b2b2",
      light: "#fff",
      dark: "#fff",

    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
    },
    warning: {
      main: "#ffa726",
      light: "#ffb74d",
      dark: "#f57c00",
    },
    info: {
      main: "#29b6f6",
      light: "#4fc3f7",
      dark: "#0288d1",
    },
    success: {
      main: "#66bb6a",
      light: "#81c784",
      dark: "#388e3c",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      disabled: "rgba(0, 0, 0, 0.38)",
      secondary: "rgba(0, 0, 0, 0.6)",
    },
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      selected: "rgba(0, 0, 0, 0.08)",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)"
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
    divider: "rgba(0, 0, 0, 0.12)"
  },
}

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      // main: "#90caf9",
      // light: "#e3f2fd",
      // dark: "#42a5f5",
      main: "#fff",
      light: "#fff",
      dark: "#fff",

    },
    secondary: {
      // main: "#ce93d8",
      // light: "#f3e5f5",
      // dark: "#ab47bc",
     
      main: "#121212",
      light: "#414141",
      dark: "#0c0c0c",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
    },
    warning: {
      main: "#ffa726",
      light: "#ffb74d",
      dark: "#f57c00",
    },
    info: {
      main: "#29b6f6",
      light: "#4fc3f7",
      dark: "#0288d1",
    },
    success: {
      main: "#66bb6a",
      light: "#81c784",
      dark: "#388e3c",
    },
    text: {
      primary: "#fff",
      disabled: "rgba(255, 255, 255, 0.5)",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
    action: {
      active: "#fff",
      hover: "rgba(255, 255, 255, 0.08)",
      selected: "rgba(255, 255, 255, 0.16)",
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)"
    },
    background: {
      default: "#121212",
      paper: "#121212",
    },
    divider: "rgba(255, 255, 255, 0.12)"
  },
  // ...myTheme(theme)
}

export const lightTheme = createMyTheme(lightThemeOptions, 'light');

export const darkTheme = createMyTheme(darkThemeOptions, 'dark');

// You can create more themes with different 'myCustomThemeType' values

export const SUPPORTED_THEMES = [
  {
    name: "light",
    mode: "light",
    theme: lightTheme,
  },
  {
    name: "dark",
    mode: "dark",
    theme: darkTheme,
  }
]


export const getDesignTokens = (mode: PaletteMode) => ({
    ...(mode === 'light'
      ? (lightTheme)
      : darkTheme)
  }
);

export default theme;