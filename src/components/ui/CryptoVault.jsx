import React from 'react'

function CryptoVault({children}) {
  return (
    <div className='h-96 p-10 w-full border-2 rounded-2xl border-gray-500'>
        {children}
    </div>
  )
}

export default CryptoVault