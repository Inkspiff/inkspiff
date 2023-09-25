
import type React from 'react'
import remarkGfm from 'remark-gfm'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { prism } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import 'github-markdown-css/github-markdown.css'
import ReactMarkdown from 'react-markdown'
// import { CodeProps } from "react-markdown/lib/ast-to-react";
// import CopyBtn from './copy-btn'
// import styles from '../styles/react-markdown.module.css'
import Box from "@mui/material/Box"


interface Props {
  doc: string
}

const Preview = (props: Props) => {
  return <Box component="div" sx={{
    px: {xs: "8px", sm: "16px", },
    py: {xs: "8px", sm: "16px", },
    // pl: {xs: "calc(16px + 48px)", sm: "calc(32px + 48px)",},
    position: "relative",
    // border: "1px solid red",
  }}
   className='markdown-body' >
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
    //   className={styles.reactMarkDown}
    //   components={{
    //     pre({ node, ...props }) { return <pre {...props} /> },
    //     code({ node, inline, className, children, style, ...props }: CodeProps) {
    //       const match = /language-(\w+)/.exec(className || '')
    //       return !inline && match ? (
    //         <CopyBtn codeText={String(children)}>
    //           <SyntaxHighlighter
    //             style={prism}
    //             language={match[1]}
    //             PreTag="div"
    //             {...props}
    //           >
    //             {String(children).replace(/\n$/, '')}
    //           </SyntaxHighlighter>
    //         </CopyBtn>
    //       ) : (
    //         <code className={className} {...props}>
    //           {children}
    //         </code>
    //       )
    //     }
    //   }}
    >
      {props.doc}
    </ReactMarkdown>
    </Box>
}

export default Preview
