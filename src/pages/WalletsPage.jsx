import React, { useEffect, useState } from "react";
import SnailHeading from "../components/ui/SnailHeading";
import WalletCard from "../components/ui/WalletCard";

// Main Component
function WalletPage() {
  const [walletCount, setWalletCount] = useState(1);

  const handleAddWallet = () => {
    try {
      setWalletCount((prev) => prev + 1);
    } catch (err) {
      setError(err?.message || "Failed to add wallet");
    } 
  };

  return (
    <div className="mt-16 w-full max-w-4xl mx-auto p-4">
      <SnailHeading />
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-xl">Wallets</h2>
        <button
          type="button"
          className={`flex items-center space-x-2 px-6 py-2 bg-black text-white rounded-lg 
             hover:bg-gray-900 transition-colors`}
          onClick={handleAddWallet}
        >
          Add Wallet
        </button>
      </div>

      <div className="space-y-4">
        {Array.from({ length: walletCount }, (_, index) => (
          <WalletCard walletIndex={index} />
        ))}
      </div>
    </div>
  );
}

export default WalletPage;
