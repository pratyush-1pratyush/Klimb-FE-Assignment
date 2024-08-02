import React from 'react'

const TH = ({children}) => {
  return (
    <th className="border-b border-gray-300 p-2 text-center">
      {children}
    </th>
  )
}

export default TH;