import React, { useEffect, useState } from "react";
import { Send, Download } from "lucide-react";
import WalletDashbord from "../components/WalletDashbord";
import SnailHeading from "../components/ui/SnailHeading";
import { useSolana } from "../hooks/useSolana";
import WalletBalance from "../components/ui/WalletBalance";
import ActionButton from "../components/ui/ActionButton";


function Home() {
  const price = "+$3 (2.60% )";
  const [priceColor, setPriceColor] = useState("text-green-500");
  const { balance, tokens, nfts, transactions, refreshBalance } = useSolana();
  const SolpublicKey = "9XaXs4Ds8VCpuU6hjN1fKvnYv13EWCeuupejwSqkxDA4";
  const EthPuvlicKey = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
  useEffect(() => {
    // refreshBalance(publicKey);
  }, []);

  useEffect(() => {
    setPriceColor(() => (price[0] == "+" ? "text-green-500" : "text-red-500"));
  }, [price[0]]);

  return (
    <>
      <div className="">
        <div className="mt-16 w-full max-w-4xl mx-auto p-4 ">
          <SnailHeading />
          <WalletBalance
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
