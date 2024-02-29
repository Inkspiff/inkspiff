import { isUserLoggedIn, syncFirebaseAuth } from '@/firebase'
import { NextComponentType, NextPageContext } from 'next';
import { Session } from 'next-auth';
import React, { useEffect } from 'react'
import { signIn, useSession } from "next-auth/react";


interface FirebaseAuthWrapperProps {
    children: React.ReactNode
    // children: NextComponentType<NextPageContext, any, any>;
    // session: Session | null
}

const FirebaseAuthWrapper = ({children}: FirebaseAuthWrapperProps) => {
    const { data: session } = useSession()

    useEffect(() => {
        syncFirebaseAuth(session)
      }, [session])





  return (
    <>{children}</>
  )
}

export default FirebaseAuthWrapper