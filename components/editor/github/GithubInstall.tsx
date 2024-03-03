import Box from '@mui/material/Box'
import Link from 'next/link'
import React from 'react'

const GithubInstall = () => {
  return (
    <Box>
        <Link href="https://github.com/apps/inkspiff-github-agent/installations/new?state=USER_ID__FILE_ID">
          Install the Inkspiff GitHub Agent
        </Link>
    </Box>
  )
}

export default GithubInstall