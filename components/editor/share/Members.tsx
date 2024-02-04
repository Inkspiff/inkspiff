import React, {useState, useEffect, use} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import { useSession, signIn, signOut } from "next-auth/react";
import { MembersType } from '@/types';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";


interface MembersProps {
    open: boolean;
    addingMember: boolean;
}

export default function Members({open, addingMember}: MembersProps) {
  const { data: session } = useSession();
  const app = useSelector((state: RootState) => state.app)

  const {markdown, markdownSelected} = app

  const [gettingFileMembers, setGettingFileMembers] = useState<boolean>(false)
  const [membersOfFileOpened, setMembersOfFileOpened] = useState<MembersType[] | null>(null)


  useEffect(() => {
    const getMembersOfFileOpened = async () => {
      setGettingFileMembers(true)
      const response = await fetch("/api/db/get-members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // userId: session!.user.id,
          mdID: markdownSelected,
        })
      })


      setGettingFileMembers(false)

      if (!response?.ok) {
        if (response.status === 402) {
          return 
        }
        return
      }

      const members = await response.json()
      setMembersOfFileOpened(members)
    }

    if (markdownSelected && session && open) {
      getMembersOfFileOpened()
    }

  }, [addingMember, open])

  return (
            <Box sx={{
                px: 2,
            }}>
                <Typography variant="body1" component="h6" sx={{
                    mb: 1,
                    fontWeight: 600,
                    fontSize: "14px",
                }}>
                    {markdown.title ? `Members of ${markdown.title}` : "Members of this file"}
                </Typography>

                {gettingFileMembers && (
                    <Stack spacing={1}>
                        <Skeleton variant="rectangular" width="100%" height={40} sx={{
                            borderRadius: "4px"
                        }}  />
                        <Skeleton variant="rectangular" width="100%" height={40} sx={{
                            borderRadius: "4px"
                        }} />
                    </Stack>
                )}

                {membersOfFileOpened && membersOfFileOpened.length === 0 && (
                    <Typography variant="body1" sx={{mt: 2}}>
                        No members yet
                    </Typography>
                )}

                {membersOfFileOpened && (membersOfFileOpened.length > 0) && !gettingFileMembers && (
                    <Stack spacing={1}>
                        {membersOfFileOpened.map((member, index) => (
                            <Paper key={index} elevation={0} sx={{ px: 0, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <Typography variant="body1" sx={{
                                    fontSize: "12px",
                                }}>
                                    {member.email}
                                </Typography>
                                <Typography variant="body2" sx={{color: "text.secondary"}}>
                                    {member.access}
                                </Typography>
                            </Paper>
                        ))}
                    </Stack>
                )}
              
              </Box>
     
  );
}