import React, {useState, useContext, useEffect} from 'react'
import Link from "next/link"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Input from '@mui/material/Input';
import { MdOutlineMail } from "react-icons/md";
import { useSession, signIn, signOut } from "next-auth/react";
import { MembersType } from '@/types'
import { EMAIL_PATTERN, generateUniqueString } from '@/lib/utils'

interface AddMemberProps {
    fileId: string;
}


const AddMember = ({fileId}: AddMemberProps) => {
  const { data: session } = useSession();
  const [memberEmailInput, setMemberEmailInput] = useState<string>("")
  const [addingMember, setAddingMember] = useState<boolean>(false)
 
  const [searchResultFromDB, setSearchResultFromDB] = useState<MembersType | null>(null)

  const handleChangeMemberEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberEmailInput(e.target.value)   
  }




  useEffect(() => {
    const handleCheckIfUser = async () => {
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
    if (EMAIL_PATTERN.test(memberEmailInput)) { 
      handleCheckIfUser()
    }
  }, [memberEmailInput])


  const handleAddMember = async () => {
    if (searchResultFromDB === null) {
      return
    }

    setAddingMember(true)
    const response = await fetch("/api/db/add-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session!.user.id,
        memberID: searchResultFromDB.id,
        memberEmail: searchResultFromDB.email,
        memberAccess: "edit",
        mdID: fileId,
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


  const handleInviteMember = async () => {
    setAddingMember(true)
    const response = await fetch("/api/db/invite-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // userId: session!.user.id,
        email: memberEmailInput,
        mdID: fileId,
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

  return (
    <Box sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        outline: "1px solid #eeeeee",
        borderRadius: "6px",
        bgcolor: "action.hover",
      }}>
        <Input 
        fullWidth
        value={memberEmailInput} 
        placeholder={"Member Email"}
        startAdornment={<MdOutlineMail />}
        onChange={handleChangeMemberEmailInput}
        type="email"
        />

        {searchResultFromDB ? <Button variant="contained" sx={{
          fontSize: "12px",
          lineHeight: "16px",
          borderRadius: "0 4px 4px 0",
        }} onClick={handleAddMember}>Add</Button>
      :  <Button variant="contained" sx={{
        fontSize: "12px",
        lineHeight: "16px",
        borderRadius: "0 4px 4px 0",
      }} onClick={handleInviteMember}>Invite</Button>}
      </Box>
  )
}

export default AddMember
