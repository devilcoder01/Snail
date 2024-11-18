import React, { useState, useRef } from "react";
import { handleInputChange, handlePaste, handleNext } from "../utils";


const ImportMemonic = () => {
  const [secretKeyArray, setSecretKeyArray] = useState(new Array(12).fill(""));
  const inputRefs = useRef([]);

  return (
    <div className="w-full flex flex-col gap-10 ">
      <div className="w-full flex justify-center">
        <div className="w-[50%] flex flex-col gap-3">
          <div className="font-medium text-2xl">Secret Key</div>
          <p className="text-sm text-[#5C5959]">
            Please write the mnemonic words
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4 w-2/3">
          {secretKeyArray.map((value, index) => (
            <input
              key={index}
              value={value}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              className="w-full h-14 bg-[#F1F1F1] text-[#1d1d1d] p-2 border rounded-md flex justify-center items-center font-semibold text-sm align-middle"
              onChange={(e) =>
                handleInputChange(secretKeyArray, setSecretKeyArray, index, e.target.value)
              }
              placeholder={`Word ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <button
          className="flex items-center space-x-2 px-6 py-2 bg-[#373737] text-white rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handlePaste(setSecretKeyArray)}
        >
          Paste
        </button>
        <button
          className="flex items-center space-x-2 px-6 py-2 bg-[#373737] text-white rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handleNext(secretKeyArray, inputRefs)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ImportMemonic;
