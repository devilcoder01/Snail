import React, { useEffect, useState } from "react";
import SnailHeading from "../components/ui/SnailHeading";
import WalletCard from "../components/ui/WalletCard";
import Button from "../components/ui/Button";
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
        <Button text={"Add Wallet"} onClick={handleAddWallet} />
      </div>

      <div className="space-y-4">
        {Array.from({ length: walletCount }, (_, index) => (
          <WalletCard key={index} walletIndex={index} />
        ))}
      </div>
    </div>
  );
}

export default WalletPage;
