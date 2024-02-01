import React, {useContext, useState, ChangeEvent} from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { ThemeContext } from '@/context/ThemeContext';
import { popupBaseStyle } from '@/config/editor';
import { set } from 'react-hook-form';
import Preview from '../Preview';
import ReactMarkdown from 'react-markdown';
import { convertToGithubHTML } from '@/lib/utils';
import html2pdf from 'html2pdf.js'

const ExportPopup = () => {
    const dispatch = useDispatch()
    const { data: session } = useSession();
    const router = useRouter()
    const app = useSelector((state: RootState) => state.app)
    const { toggleTheme, theme} = useContext(ThemeContext);
    const [exportingFile, setExporttingFile] = useState(false)

    const {palette, } = theme
    const {mode } = palette
    const { markdown: {content, title}, viewSettings } = app

    const open = viewSettings.popup === "export"

  const handleClose = () => {
        dispatch(appActions.setPopup(""))
    };

  const handleExportFileAsMarkdown = async () => {
    if (content) {
        const blob = new Blob([content], { type: 'text/markdown' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${title.split(" ").join("-")}.md`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
  }

  

  const handleExportFileAsHTML = async () => {
    if (typeof window === "undefined") return
    if (typeof document === "undefined") return

    if (content) {
        // Convert Markdown to HTML using react-markdown
        const htmlContent  = await convertToGithubHTML(content)
        console.log({htmlContent})

        // Create a Blob with the HTML content
        const blob = new Blob([`<!DOCTYPE html><html><head><title>${title}</title></head><body>${htmlContent}</body></html>`], {
          type: 'text/html',
        });
  
        // Create a link to trigger the download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${title.split(' ').join('-')}.html`;
  
        // Append the link to the document and trigger the click event
        document.body.appendChild(link);
        link.click();
  
        // Remove the link from the document
        document.body.removeChild(link);
      }
  }

  const handleExportFileAsPDF = async () => {
    if (content) {
        const htmlContent  = await convertToGithubHTML(content)
        console.log({htmlContent})
        
        const pdfOptions = {
            margin: 10,
            filename: `${title.split(' ').join('-')}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
            html2canvas: {
                scale: 2,
                letterRendering: true,
                useCORS: true,
            },
            // margin: 10,
            // filename: ,
            // image: { type: 'jpeg', quality: 0.98 },
            // html2canvas: { scale: 2 },
            // jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          };

          const customStyles = `
            <style>
                /* Adjust list styles */
                ul, ol {
                    /*  margin: 0;
                        padding: 0;
                        list-style-position: inside; */
                }

                li {
                    /* margin-bottom: 8px; */  /* Adjust the margin as needed */
                }
            </style>
        `;

        const modifiedHtmlContent = `${customStyles}${htmlContent}`;
        
          html2pdf().from(modifiedHtmlContent).set(pdfOptions).save();
      }
  }

  const handleExportFileAsWordDoc = async () => {
    if (content) {
        console.log("Exporting as DOCX")
      }
  }



  

  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Paper sx={{
            ...popupBaseStyle,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
          
            <Typography variant="h2" component="h3" sx={{
                fontWeight: 700,
                color: mode === "dark" ? "#fff" : "#000",
                textAlign: "center",
            }}>
                Export as
            </Typography>
            
            <Typography variant="body1" component="p" sx={{
                fontSize: "1rem",
                color: mode === "dark" ? "#fff" : "#000",
                textAlign: "center",
                mb: 2
            }}>
                Export your file as a Markdown or HTML file.
            </Typography>
        
            <Grid container spacing={2} sx={{
                // border: "1px solid red",
                p: 2,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "&::-webkit-scrollbar": {
                    width: "0px",
                }
            
            }}>
               
                <Grid item xs={6}>
                    <Button onClick={handleExportFileAsMarkdown} variant="contained" sx={{
                        width: "100%",
                        backgroundColor: "#000",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        "&:hover": {
                            backgroundColor: "#000"
                        }
                    }}>
                        Markdown
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleExportFileAsHTML} variant="contained" sx={{
                        width: "100%",
                        backgroundColor: "#000",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        "&:hover": {
                            backgroundColor: "#000"
                        }
                    }}>
                        HTML
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleExportFileAsPDF} variant="contained" sx={{
                        width: "100%",
                        backgroundColor: "#000",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        "&:hover": {
                            backgroundColor: "#000"
                        }
                    }}>
                        PDF
                    </Button>
                </Grid>

                <Grid item xs={6}>
                    <Button onClick={handleExportFileAsWordDoc} variant="contained" sx={{
                        width: "100%",
                        backgroundColor: "#000",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        "&:hover": {
                            backgroundColor: "#000"
                        }
                    }}>
                        DOCX
                    </Button>
                </Grid>

            </Grid>
        </Paper>
      </Modal>
    </>
  )
}

export default ExportPopup