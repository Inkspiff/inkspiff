import React, {useState, useContext, useEffect} from 'react'
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MembersType } from '@/types'

interface MembersProps {
  fileId: string;
  reRun: boolean;
}

const Members = ({fileId, reRun}: MembersProps) => {

  const [membersOfFileOpened, setMembersOfFileOpened] = useState<MembersType[]>([])
  const [loadingMembersOfFileOpened, setLoadingMembersOfFileOpened] = useState<boolean>(false)
  
  const [accessOptionsAnchorEl, setAccessOptionsAnchorEl] = React.useState<null | HTMLElement>(null);
  const [loadingMemberAccessChange, setLoadingMemberAccessChange] = useState<boolean>(false)



  useEffect(() => {
    // get file members

    const getMembersOfFileOpened = async () => {
      setLoadingMembersOfFileOpened(true)
      const response = await fetch("/api/db/get-members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // userId: session!.user.id,
          mdID: fileId,
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
      setMembersOfFileOpened(json)
      console.log({json})
    }

    if (fileId) {
      getMembersOfFileOpened()
    }

  }, [fileId, reRun, loadingMemberAccessChange])


  // Access options
  const open = Boolean(accessOptionsAnchorEl);
  const handleOpenAccessOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAccessOptionsAnchorEl(event.currentTarget);
  };
  const handleCloseAccessOptions = () => {
    setAccessOptionsAnchorEl(null);
  };

  const handleChangeMemberAccess = async (index: number, newAccess: string) => {
    console.log("change member access")

    setLoadingMemberAccessChange(true)
    const response = await fetch("/api/db/set-member-access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // userId: session!.user.id,
        memberID: membersOfFileOpened[index].id,
        memberEmail: membersOfFileOpened[index].email,
        memberAccess: newAccess,
        mdID: fileId,
      })
    })

    setLoadingMemberAccessChange(false)

    if (!response?.ok) {
      if (response.status === 402) {
        return 
      }
      return
    }
  
  
  }

 

 


  return (
    <>
    <Typography variant="body2" component="h4" sx={{
                
              }}>Members</Typography>

              {/* TODO: TABLE OF MEMBERS */}

              <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">Access</TableCell>
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
              <TableCell align="right">
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleOpenAccessOptions}
                >
                  {member.access}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={accessOptionsAnchorEl}
                  open={open}
                  onClose={handleCloseAccessOptions}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => handleChangeMemberAccess(index, "edit")}>edit</MenuItem>
                  <MenuItem onClick={() => handleChangeMemberAccess(index, "view")}>view</MenuItem>
                  <MenuItem onClick={() => handleChangeMemberAccess(index, "remove")}>remove</MenuItem>

                  {/* TODO: CHANGING ADMINS ACCESS */}
                </Menu>
                </div>
                </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default Members