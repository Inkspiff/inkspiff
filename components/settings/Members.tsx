import React, {useState, useContext, useEffect} from 'react'
import Link from "next/link"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Switch from "@mui/material/Switch"
import Grid from "@mui/material/Grid"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Input from '@mui/material/Input';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from "@/store/app-slice";
import { useSession, signIn, signOut } from "next-auth/react";
import { ThemeContext } from '@/context/ThemeContext'
import { MdOutlineMail } from "react-icons/md";
import { IoMdRemoveCircle } from "react-icons/io";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MembersType } from '@/types'

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}



const Members = () => {
  const { data: session } = useSession();
  const app = useSelector((state: RootState) => state.app)
  const { toggleTheme, theme} = useContext(ThemeContext);

  const {palette, } = theme
  const {mode } = palette

  const {viewSettings, fileList, markdown, markdownSelected} = app
  const [loadingFiles, setLoadingFiles] = useState(false)
  const [fileOpened, setFileOpened] = useState<string | null>(null)
  const [memberEmail, setMemberEmail] = useState<string>("")
  const [addingMember, setAddingMember] = useState<boolean>(false)
  const [membersOfFileOpened, setMembersOfFileOpened] = useState<MembersType[]>([])
  const [loadingMembersOfFileOpened, setLoadingMembersOfFileOpened] = useState<boolean>(false)

  const {members} = markdown

  const handleOpenFile = (id: string) => {
    setFileOpened(id)
    console.log({id})
  }

  const handleChangeMemberEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberEmail(e.target.value)
    console.log({memberEmail})
  }

  const handleAddMember = async () => {
    console.log({memberEmail, fileOpened})

    setAddingMember(true)
    const response = await fetch("/api/db/add-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // userId: session!.user.id,
        email: memberEmail,
        mdID: markdown.id,
      })
    })

    setAddingMember(false)

    if (!response?.ok) {
      if (response.status === 402) {
        return 
      }
      return
    }
  }

  const handleCopyInviteLink = async () => {
    console.log("copy invite link")
  }

  useEffect(() => {
    // get file members
    console.log({memberEmail, fileOpened})

    const getMembersOfFileOpened = async () => {
      setLoadingMembersOfFileOpened(true)
      const response = await fetch("/api/db/get-members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // userId: session!.user.id,
          mdID: markdown.id,
        })
      })

      setLoadingMembersOfFileOpened(false)

      if (!response?.ok) {
        if (response.status === 402) {
          return 
        }
        return
      }

      const json = await response.json()
      console.log({json})
    }

    if (fileOpened) {
      getMembersOfFileOpened()
    }

  }, [fileOpened])


  if (!session ) {
    return <Box sx={{
      height: "100%",
      
    }}>
         <Typography variant="body1" component="h2" sx={{
          fontWeight: 700,
          mb: 2,
        }}>Members</Typography>
        <Divider sx={{
          my: 2
        }}/>

        <Box sx={{
          
          // display: "flex",
          // flexDirection: "column",
          // alignItems: "center",
          // justifyContent: "center",
        }}>
           <Typography variant="body2" component="h4" sx={{   
            mb: 1      
            }}>Login to use members feature for free</Typography>
            <Typography variant="body2" sx={{
              fontSize: "12px",
              mb: "4px"
            }}>Invite and manage members for each file you create, collaborate with others to update and maintain your work</Typography>
         
         <Box sx={{
          "& a:hover": {
            textDecoration: "underline"
          }
         }}>  
          <Link href="/login">Login</Link>
         </Box>
        </Box>

    </Box>
  }

  return (
    <Box sx={{
      height: "100%",
      
    }}>
         <Typography variant="body1" component="h2" sx={{
          fontWeight: 700,
          mb: 2,
        }}>Members</Typography>
        <Divider sx={{
          my: 2
        }}/>

        {!!fileList 
        ? <Grid container sx={{
          height: "calc(100% - 56px)"
        }}>
          <Grid item sm={4} sx={{
            height: "100%",
            overflowY: "auto",
            bgcolor: ( mode === "light") ? "rgb(251, 251, 250)" : "rgb(28, 28, 28)",
            borderRadius: "0 8px 8px 0",
            py: 2,
          }}>
              <List>
                  {fileList.map((file, index) => {

                    return <ListItem key={index} sx={{
                      // border: "1px solid red",
                      p: 0,
                      m: 0,
                      px: "4px",
                    }}>
                      <ListItemButton  sx={{
                      // border: "1px solid blue",
                      p: "2px 12px",
                      m: 0,
                      borderRadius: "4px",
                      bgcolor: (fileOpened === file.id) ? "action.hover" : ""
                    }}  onClick={() => {handleOpenFile(file.id)}}>
                        <ListItemText primary={<Typography sx={{
                      // border: "1px solid red",
                      p: 0,
                      m: 0,
                      fontSize: "12px",
                    }}>{file.title}</Typography>}/>
                      </ListItemButton>
                    </ListItem>
                  })}
              </List>
          </Grid>
          <Grid item sm={8}>
            <Box sx={{
              
              p: 2,
            }}>
              <Box sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
              }}>

                <Box>
                    <Typography variant="body2" component="h4" sx={{
                        
                      }}>Invite link</Typography>
                      <Typography variant="caption" sx={{
                      mb: 2,
                      }}>Share this secret link to invite people to this file. Only users who can invite members can see this. You can <span>reset this link</span> for all space members to generate a new invite link.</Typography>

                      
                    
                </Box>

                <Switch />
              </Box>

              <Box sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                outline: "1px solid #eeeeee",
                borderRadius: "6px",
                bgcolor: "rgb(251, 251, 250)",
              }}>
                <Input 
                fullWidth
                value={memberEmail} 
                placeholder={"Member Email"}
                startAdornment={<MdOutlineMail />}
                onChange={handleChangeMemberEmail}
                type="email"
                />

                <Button variant="contained" sx={{
                  fontSize: "12px",
                  lineHeight: "16px",
                  borderRadius: "0 4px 4px 0",
                }} onClick={handleAddMember}>Send</Button>
              </Box>

              <Divider sx={{
                my: 2
              }} />

              <Typography variant="body2" component="h4" sx={{
                
              }}>Members</Typography>

              {/* TODO: TABLE OF MEMBERS */}

              <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">Access</TableCell>
            <TableCell align="right">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {membersOfFileOpened.map((member, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {member.email}
              </TableCell>
              <TableCell align="right">{member.access}</TableCell>
              <TableCell align="right"><IoMdRemoveCircle /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
              
            </Box>
          </Grid>
        </Grid>
          
        : <Box>You don&apos;t have any files</Box>
        }
        
        
    </Box>
  )
}

export default Members

/**
 * <LoadingButton
                  size="small"
                  onClick={handleAddMember}
                  loading={addingMember}
                  variant="outlined"
                  disabled
                >
                  <span>Add</span>
                </LoadingButton>
 */