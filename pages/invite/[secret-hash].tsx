import React, {useEffect} from "react"
import Head from "next/head";
import Box from "@mui/material/Box";
import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession } from "next-auth/next"
import {getAuthOptions} from "@/lib/auth"
import { db } from "@/firebase"
import { doc, getDocs, collection, where, query, updateDoc, getDoc } from "firebase/firestore";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, getAuthOptions());
  const hash = context.params!['secret-hash'] as string
  
  if (!session) {
    return { redirect: { destination: "/login" } };
  }

  try {
    const q = query(collection(db, "markdowns"), where("secret.hash", "==", hash));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const mdID = querySnapshot.docs[0].id;
        const docData = querySnapshot.docs[0].data();
        const memberID = session.user.id;
        
        const memberRef = doc(db, "markdowns", mdID, "members", memberID);


        const memberDocSnap = await getDoc(memberRef)

        if (memberDocSnap.exists()) {
            const access =  memberDocSnap.data().access

            if (access !== "owner") {
              await updateDoc(memberRef, {
                email: session.user.email,
                access: 'edit',
              })
            }
        } else {
          await updateDoc(memberRef, {
            email: session.user.email,
            access: 'edit',
          })
        }

        console.log("Access Granted Successfully!");

        const docTitle = docData.title
        const docTitleWithDashes = docTitle.trim().split(" ").join("-")
                
        return {
          redirect: {
            destination: `/editor/${docTitleWithDashes}-${mdID}`,
            },
        }

        
        
      } else {
        console.log('No such document!');
        return {
            notFound: true,
        }
      }
  } catch (err) {
    console.log({err})
    return {
      notFound: true,
    }
  }

}


export default function App({ session, slug, providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {


  return (
    <div>
      <Head>
        <title>Create README | Inkspill</title>
      </Head>
      
      <Box>
        {/* Here */}
      </Box>
    </div>
  );
}


