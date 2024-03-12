import Button from '@mui/material/Button'
import React from 'react'

interface GithubInstallProps {
  userID: string,
  markdownID: string
}

const GithubInstall = ({userID, markdownID}:GithubInstallProps) => {
  return (
    <>
        <Button
          href={`https://github.com/apps/inkspiff-github-agent/installations/new?state=${
            userID
          }__${markdownID}`}
        >
          Install App
        </Button>
        
    </>
  )
}

export default GithubInstall