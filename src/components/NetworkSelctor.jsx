import React from 'react'
import { ChevronDown } from 'lucide-react';
function AddressDisplay () {
    return (
        <div className="relative">
          <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg bg-white hover:bg-gray-50">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1">
                <div className="w-5 h-5 rounded-full bg-blue-500"></div>
                <div className="w-5 h-5 rounded-full bg-green-500"></div>
              </div>
              <span>Networks</span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      );
}

export default AddressDisplay 