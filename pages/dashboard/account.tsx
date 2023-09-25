import React from 'react'
import { useSession, signOut, getSession } from 'next-auth/react'
// import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from 'next';
// import { getServerSession } from "next-auth/next"
// import { getProviders } from "next-auth/react"
// import {authOptions} from "@/lib/auth"


// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     const session = await getServerSession(context.req, context.res, authOptions);
//     const providers = await getProviders();
    
//     return {
//       props: { 
//         session: session,
//         providers: providers ?? [] 
//       },
//     }
//   }

// { session, providers }: InferGetServerSidePropsType<typeof getServerSideProps>

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

export default Account