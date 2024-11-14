import React, { useEffect, useState } from "react";

const MoreWallets = () => {
  const [activeToken, setActiveToken] = useState("tokens");

  const tabs = [
    { id: "Evm", label: "Etherium" },
    { id: "Sol", label: "Solana" },
    { id: "Ton", label: "TON" },
  ];
  return (
    <div className="box h-72 w-auto border-2 rounded-lg p-6">
      <h2 className="font-semibold mb-4">Wallet 0</h2>

      <div className="flex   border-gray-200 ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`  font-medium text-sm px-4 py-2 rounded-sm transition-colors mb-9 ${
              activeToken === tab.id
                ? "bg-gray-200 text-gray-800"
                : "bg-gray-100"
            }`}
            onClick={() => setActiveToken(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>  
      <div className=" w-full h-28 bg-gray-100 rounded-md flex py-5 justify-center ">
        <div className="publickey w-1/2 px-6">
          <h3 className="font-semibold text-sm mb-4">Publickey</h3>
          <div className="text-[12px]">asdkjfoaisjfcoijsdkfjdslkjfoasjd</div>
        </div>
        <div className="h-full w-1 bg-gray-800 rounded-lg"></div>
        <div className="privatekey w-1/2 px-6">
          <h3 className="font-semibold text-sm mb-4">Private Key</h3>
          <div className="privatekey text-[12px]"></div>
        </div>
      </div>
    </div>
  );
};

function WalletPage() {

  
  return (
    <div className="mt-16 w-full max-w-4xl mx-auto p-4">
      <div className="Heading mb-8">
        <h1 className="text-3xl font-bold mb-2">Snail</h1>
        <p className="text-gray-500 mb-4">A web based wallet</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-xl">Wallets</h2>
        <button
          type="button"
          className="flex items-center space-x-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900"
          onClick
        >
          Add Wallet
        </button>
      </div>

      <div>
        <MoreWallets />
      </div>
    </div>
  );
}

export default WalletPage;
