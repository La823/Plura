import React from 'react'

const layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='h-full flex justify-around align-top bg-amber-500'>{children}</div>
  )
}

export default layout