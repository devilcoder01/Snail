import React, { useEffect, useState } from "react";
import AssetSection from "../components/Assets";
import AddressDisplay from "./NetworkSelctor";


function WalletDashbord() {
  const [activeTab, setActiveTab] = useState("tokens");

  const tabs = [
    { id: "tokens", label: "Tokens" },
    { id: "transactions", label: "Transactions" },
    { id: "nfts", label: "NFTs" },
  ];

  useEffect(() => {
    
  })

  return (
    <div className="max-w-4xl mx-auto p-6 h-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-6 border-b border-gray-200 w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`py-2 px-1 -mb-px font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* <AddressDisplay/> */}
        </div>
      </div>
      <AssetSection />
    </div>
  );
}

export default WalletDashbord;
