import React, { useEffect } from 'react'
// import { Octokit, App } from "octokit";
import { useSession } from "next-auth/react";


  

const GithubModal = () => {
  const { data: session } = useSession();

    useEffect(() => {
        const getIssues = async () => {
         // octokit fetch request

        }
        
        if (session) {
          getIssues()
        }
    }, [])
  return (
    <div>GithubModal</div>
  )
}

export default GithubModal