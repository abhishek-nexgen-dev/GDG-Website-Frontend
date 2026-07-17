import React from 'react'

type PublicLayOutProps = {
    children: React.ReactNode
}

// for all user it just a template 
const PublicLayout = ({children} : PublicLayOutProps) => {
  return (
    <div>
        {/* Include Nav */}
        
        {children}
         
        
        {/* Include Footer */}
        t</div>
  )
}

export default PublicLayout