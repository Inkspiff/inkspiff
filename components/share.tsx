import React, {useContext} from 'react'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import {
    LinkedinShareButton,
    RedditShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";

  import {
    RedditIcon,
    LinkedinIcon,
    TwitterIcon,
    WhatsappIcon,
  } from "react-share";
  import { ThemeContext } from '@/context/ThemeContext';

const Share = ({mode="light", showText=true}: {mode?: "light"| "dark", showText?: boolean}) => {
  const { toggleTheme, theme} = useContext(ThemeContext);

  const {palette, } = theme
  const {mode: themeMode } = palette
  
  return (
    <div>
        {showText && <Typography variant="body1" sx={{
            mb: 1,
            fontWeight: 300,
        }}>🥹 Pls. Help us get to others! 🤲</Typography>}
        <TwitterShareButton url={"https://inkspiff.com\n\n"} title={"🚀 Exciting News! 🚀\n@Inkspiff's waitlist is out, the ultimate platform for creating code docs! ✨\n\n- Create, Edit, and Share with ease.\n- Seamlessly manage all your readmes.\n- Be the first to experience the future of open source documentation!\n\nJoin the waitlist now 👇\n"} 
        via={"pinqode"}
        hashtags={["inkspiff", "codedoc",]}
        related={["pinqode"]}
        style={{
            // border: "1px solid red",
        }}>

                <TwitterIcon size={"48px"} borderRadius={8} bgStyle={{
                    fill: mode === "light" ? "white" : "#121212"
                }}iconFillColor='#26a7de ' style={{
                    // border: "1px solid red",
                }}/>
                
        </TwitterShareButton>

        <LinkedinShareButton url={"https://inkspiff.com"} title={"Join Inkspiff Waitlist"} summary={"Inkspiff's waitlist is out."} source={"https://inkspiff.com"}>
        <LinkedinIcon size={"48px"} borderRadius={8} bgStyle={{
                    fill: mode === "light" ? (themeMode === "light" ? "white" : "#121212")  : "#121212"
                }}iconFillColor='#0072b1' />
        </LinkedinShareButton>

        <RedditShareButton url={"https://inkspiff.com"} title={"Join Inkspiff's Waitlist"} >
                <RedditIcon size={"48px"} borderRadius={8} bgStyle={{
                    fill: mode === "light" ? (themeMode === "light" ? "white" : "#121212") : "#121212"
                }} iconFillColor='#FF4500' />
        </RedditShareButton>
    </div>
  )
}

export default Share