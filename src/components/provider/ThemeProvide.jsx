import React from 'react'

function ThemeProvide({children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {children}
    </div>
  );
}



export default ThemeProvide