import React from 'react'

interface propTypes {
    title: string,
    description: string,
    variant?: string,
}

const Toast = ({title, description, variant} : propTypes) => {
  return (
    <div>Toast</div>
  )
}

export default Toast