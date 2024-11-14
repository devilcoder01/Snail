import React, { useState, useRef } from "react";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import CryptoVault from "../components/ui/CryptoVault";
import SnailHeading from "../components/ui/SnailHeading";
import Button from "../components/ui/button";

const MenoMonic = ({ seedphraseArr }) => {
  const CopytoClipBoard = async () => {
    try {
      const seedPhraseText = seedphraseArr.join(' ');
      await navigator.clipboard.writeText(seedPhraseText);
      // Optional: Add a visual feedback that copying was successful
      alert('Seed phrase copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy seed phrase');
    }
  };

  return (
    <div className="w-full flex flex-col gap-10 ">
      <div className="w-full flex justify-center">
        <div className="w-[50%] flex flex-col gap-3">
          <div className="font-medium text-2xl">Secret Key</div>
          <p className="text-sm text[#5C5959]">Bury it under the house</p>
        </div>
        <div className="grid grid-cols-4 gap-4 w-2/3">
          {seedphraseArr.map((word) => (
            <div className="relative ">
              <div className="w-full h-14 bg-[#F1F1F1] text-[#1d1d1d] p-2 border rounded-md flex justify-center items-center font-semibold text-sm  ">
                {word}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4  ">
        <button onClick={CopytoClipBoard} className="flex items-center space-x-2 px-6 py-2 bg-[#373737] text-white rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
          Copy
        </button>
        <button className="flex items-center space-x-2 px-6 py-2 bg-[#373737] text-white rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
          Next
        </button>
      </div>
    </div>
  );
};

function Signin() {
  const [view, setView] = useState("initial");
  const [isWalletCreated, setIsWalletCreated] = useState(false);
  const [isWalletImported, SetIsWalletImported] = useState(false);

  const [seedPhrase, setSeedPhrase] = useState([]);
  const inputRefs = useRef([]);

  const generateSeedPhrase = () => {
    setView("seedPhrase");
    const phrase = generateMnemonic();
    const words = phrase.split(" ");
    setSeedPhrase(words);
    setIsWalletCreated(true);
    localStorage.setItem("walletSeedPhrase", phrase);
  };

  

  const importSeedPhrase = () => {
    setView("import");
  };

  return (
    <div className="mt-16 w-full max-w-4xl mx-auto p-4 ">
      <SnailHeading />
      <CryptoVault>
        {view === "initial" && (
          <div className="flex h-full w-full justify-center items-center">
            <div className="box flex gap-8">
              <Button
                text={"Create Wallet"}
                type="button"
                onClick={generateSeedPhrase}
              />
              <Button text={"Import Wallet"} type="button" />
            </div>
          </div>
        )}
        {view === "seedPhrase" && <MenoMonic seedphraseArr={seedPhrase} />}
        {view === "import" && <div>imported</div>}
      </CryptoVault>
    </div>
  );
}

export default Signin;
