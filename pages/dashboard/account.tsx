import React from 'react'
import { useSession, signOut, getSession } from 'next-auth/react'

const Account = () => {
    const {data: session, status} = useSession({required: true})

    if (status === "authenticated") { // session
        return (
            <>
                <p>Welcome, {session.user!.name} </p>
                <button onClick={() => signOut()}>Sign Out</button>
            </>
        );
    } else if (status === 'loading') {
        return ( <>
            <p>
                Loading 
            </p>
            </>)
    } else {
        return (
            <div>
                You are not signed in!
            </div>
          );
    }
 
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context)

    return {
        props: {session}
    }
}

export default Account