import React, { useEffect, useState } from "react";

import { Send, Download } from "lucide-react";
import WalletDashbord from "../components/WalletDashbord";
import SnailHeading from "../components/ui/SnailHeading";
import { useSolana } from "../hooks/useSolana";

const BalanceDisplay = ({ balance, price, priceColor }) => (
  <div className="balance-area mb-9 flex flex-col gap-4">
    <div className="ac-balance text-4xl font-bold">
      {balance.toFixed(2)} SOL{" "}
      {/* Ensure balance is shown as a floating value */}
    </div>
    <div className={priceColor}>{price}</div>
  </div>
);

const ActionButton = ({ label, Icon }) => (
  <button className="flex items-center space-x-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900">
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </button>
);

function Home() {
  const price = "+$3 (2.60% )";
  const [priceColor, setPriceColor] = useState("text-green-500");
  const { balance, tokens, nfts, transactions, refreshBalance } = useSolana();
  const publicKey = "CT8VxPn2T1G26oqLE4u3R2WPzeRWeQiFHViX2MKHZfQF";
  useEffect(() => {
    refreshBalance(publicKey);
  }, [publicKey]);

  useEffect(() => {
    setPriceColor(() => (price[0] == "+" ? "text-green-500" : "text-red-500"));
  }, [price[0]]);

  return (
    <>
      <div className="">
        <div className="mt-16 w-full max-w-4xl mx-auto p-4 ">
          <SnailHeading />
          <BalanceDisplay
            balance={balance}
            price={price}
            priceColor={priceColor}
          />
          <div className="flex space-x-3">
            <ActionButton label="Send" Icon={Send} />
            <ActionButton label="Receive" Icon={Download} />
          </div>
        </div>
        <WalletDashbord />
      </div>
    </>
  );
}

export default Home;
