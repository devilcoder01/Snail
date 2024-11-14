import React from 'react'

function PhraseSeed() {
    const SeedPhrase = "ladder island extra party slice what tennis balance already lion arch burger"

  return (
    <div className="mt-16 w-full max-w-4xl mx-auto p-4 ">
      <div className="Heading mb-8">
        <h1 className="text-3xl font-bold mb-2">Snail</h1>
        <p className="text-gray-500 mb-4">A web based wallet</p>
      </div>
      <div className="h-96 w-full border-2 rounded-lg flex justify-center items-center">
        <div className="grid grid-cols-4 gap-4">
          {SeedPhrase.map((word, index) => (
            <div key={index} className="relative">
              <input
                ref={el => inputRefs.current[index] = el}
                type="text"
                value={word}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Word ${index + 1}`}
                autoComplete="off"
                spellCheck="false"
              />
              <span className="absolute -top-2 left-2 text-xs bg-white px-1 text-gray-500">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PhraseSeed