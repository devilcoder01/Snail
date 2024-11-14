import React, { useEffect, useState } from "react";

import { Send, Download } from "lucide-react";
import WalletDashbord from "../components/WalletDashbord";
import SnailHeading from "../components/ui/SnailHeading";

function Home() {
  const price = "+$3 (2.60% )";
  const [priceColor, setPriceColor] = useState("text-green-500");

  useEffect(() => {
    setPriceColor(() => (price[0] == "+" ? "text-green-500" : "text-red-500"));
  }, [price[0]]);

  return (
    <>
      <div className="">
        <div className="mt-16 w-full max-w-4xl mx-auto p-4 ">
          <div className="">
            <SnailHeading/>

            {/* User Balance Section */}
            <div className="balancearea mb-9 flex flex-col gap-4">
              {/* this section leter shoud be dynamic so keep it mind  */}
              <div className="ac-balance text-4xl font-bold ">$ 200</div>
              <div className={`${priceColor} `}>{price}</div>
            </div>

            {/* Send and Recive Button */}
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900">
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900">
                <Download className="w-4 h-4" />
                <span>Receive</span>
              </button>
            </div>
          </div>
        </div>
        <WalletDashbord />
      </div>
    </>
  );
}

export default Home;
