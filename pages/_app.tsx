import React, {useContext} from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider, ThemeContext } from '@/context/ThemeContext';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme, {lightTheme, darkTheme, getDesignTokens} from '@/config/theme';
import GlobalStyles from '@/styles/GlobalStyles';
import createEmotionCache from '@/config/createEmotionCache';
import store from "@/store/index";
import { Provider } from "react-redux";
import '@/styles/render.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export const ThemeContextAdderCompForMui = ({children}: {children: React.ReactNode}) => {
  
  const { theme } = useContext(ThemeContext);

  return <MuiThemeProvider theme={theme}>
  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
  <CssBaseline enableColorScheme />
  <GlobalStyles />
  {children}
</MuiThemeProvider>
}


export default function MyApp(props: MyAppProps) {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  
  

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider>
      <Provider store={store}>
        
        <ThemeContextAdderCompForMui>
        <Component {...pageProps} />
        </ThemeContextAdderCompForMui>
      
      
      </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}