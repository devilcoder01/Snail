import React from 'react'

function ActionButton({ label, Icon }) {
  return (
    <button className="flex items-center space-x-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900">
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </button>
  )
}

export default ActionButton