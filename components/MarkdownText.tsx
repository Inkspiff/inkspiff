import React, {useState, useEffect} from "react"
import Box from "@mui/material/Box"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import TextField from "@mui/material/TextField"
import { appActions } from "@/store/app-slice";

// interface MarkdownTextInterface {
    // id: string
// }

const MarkdownText = () => {
    const dispatch = useDispatch()
    // const app = useSelector((state: RootState) => state.app)
    // const {markdown} = app
    const [markdownText, setMarkdownText] = useState<string>("")
    // const [timer, setTimer] = useState(0)


    const handleChange = (event: any) => {
        setMarkdownText(event.target.value)
        // setTimer(3000)
    }

    useEffect(() => {
        // if (timer === 0) {
        //     dispatch(appActions.updateMarkdown({text: markdownText}))
        // } else {
        //     setTimeout(() => {
        //       setTimer(0)  
        //     }, timer)
        // }

        dispatch(appActions.updateMarkdown({text: markdownText}))
       
    }, [markdownText, dispatch])


    return<Box sx={{
        minHeight: "100%",
        border: "1px solid red",
        p: 2,
    }}>
        <TextField 
        fullWidth
        multiline
        onChange={handleChange}
        value={markdownText}
    />
        </Box>
}

export default MarkdownText
