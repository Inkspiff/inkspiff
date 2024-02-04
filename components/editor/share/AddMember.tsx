import React, {useState, useEffect, use} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { appActions } from '@/store/app-slice';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router"
import { MembersType } from '@/types';
import { EMAIL_PATTERN } from '@/lib/utils';


interface AddMemberProps {
    open: boolean;
    onAddingMember: (val: boolean) => void;
    addingMember: boolean;
}

export default function AddMember({open, onAddingMember, addingMember}: AddMemberProps) {
  const { data: session } = useSession();
  const dispatch = useDispatch()
  const app = useSelector((state: RootState) => state.app)
  const theme = useTheme()

  const [memberEmailInput, setMemberEmailInput] = useState<string>("")
  const [searchResultFromDB, setSearchResultFromDB] = useState<MembersType | null>(null)
  
  const { markdownSelected} = app

  const handleMemberEmailInputChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setMemberEmailInput(e.currentTarget.value)
  }


  useEffect(() => {
    const handleCheckIfUser = async () => {
      console.log({memberEmailInput})
      const response = await fetch("/api/db/get-user-from-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: memberEmailInput,
        })
      })
  
      if (!response?.ok) {
        if (response.status === 402) {
          return 
        }
        setSearchResultFromDB(null)
        return 
      }
  
      const member = await response.json()
      setSearchResultFromDB(member)
      console.log({member})
    }
    if (EMAIL_PATTERN.test(memberEmailInput)) { // TODO: check if valid
      handleCheckIfUser()
    }
  }, [memberEmailInput])


  const handleAddMember = async () => {
    if (searchResultFromDB === null) {
      // TODO: send invite email
      return
      
    }

    onAddingMember(true)
    const response = await fetch("/api/db/add-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // userId: session!.user.id,
        memberID: searchResultFromDB.id,
        memberEmail: searchResultFromDB.email,
        memberAccess: "edit",
        mdID: markdownSelected,
      })
    })

    onAddingMember(false)

    if (!response?.ok) {
      if (response.status === 402) {
        return 
      }
      return
    }
  }


  return (
    <Box>
        <Box sx={{
    px: "8px",
    my: 1,
    // border: "1px solid red",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
    }}>
        <Box component="input" value={memberEmailInput} placeholder='Email' onChange={handleMemberEmailInputChange} sx={{
        border: "1px solid",
        borderColor: "grey.A200",
        p: "6px 8px",
        width: "calc(100% - 72px)",
        lineHeight: "16px",
        fontSize: "14px",
        borderRadius: "4px",
        mr: 1,
        }} />
        {searchResultFromDB ? <Button disabled={addingMember} variant="contained" size="small" onClick={handleAddMember}>{addingMember ? "Adding" : "Add"}</Button> : <Button variant="contained" size="small" onClick={handleAddMember}>invite</Button>}
        </Box>
    </Box>
     
  );
}