import React, { useState } from "react";
import { generateMnemonic, mnemonicToSeed } from "bip39";



function Signin() {
  const [isWalletCreated, setIsWalletCreated] = useState(false);
  const [isWalletImported, SetIsWalletImported] = useState(false);

  const CreatWalletPhraseSeed = () => {
    const seed = generateMnemonic();
    setIsWalletCreated(true);
    console.log(isWalletCreated);

    localStorage.setItem("walletSeedPhrase", seed);
    // document.getElementById("walletbox").innerText(

    // )
  };

  return (
    <div className="mt-16 w-full max-w-4xl mx-auto p-4 ">
      <div className="Heading mb-8">
        <h1 className="text-3xl font-bold mb-2">Snail</h1>
        <p className="text-gray-500 mb-4">A web based wallet</p>
      </div>
      <div className="h-96 w-full border-2 rounded-2xl flex justify-center items-center border-gray-500" id="Walletbox">
        {!isWalletCreated && !isWalletImported ? (
          <div className="box flex gap-8">
            <button
              className="flex items-center space-x-2 px-6 py-4 bg-black text-white rounded-lg hover:bg-gray-900"
              type="button"
              onClick={() => CreatWalletPhraseSeed()}
            >
              Create Wallet
            </button>
            <button
              className="flex items-center space-x-2 px-6 py-4 bg-black text-white rounded-lg hover:bg-gray-900"
              type="button "
            >
              Import Wallet
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Signin;
