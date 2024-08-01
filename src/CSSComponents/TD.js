import React from 'react'

const TD = ({children}) => {
  return (
    <td className="border-b border-gray-300  p-2 text-center">
      {children}
    </td>
  )
}

export default TD;