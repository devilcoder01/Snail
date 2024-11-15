import React, { useState, useRef } from "react";
import CryptoVault from "../components/ui/CryptoVault";
import SnailHeading from "../components/ui/SnailHeading";
import Button from "../components/ui/button";
import CreateMenominc from "../components/CreateMenominc";
import ImportMemonic from "../components/ImportMenomic";
import { generateSeedPhrase } from "../utils";

function Signin() {
  const [view, setView] = useState("initial");
  const [isWalletCreated, setIsWalletCreated] = useState(false);
  const [isWalletImported, SetIsWalletImported] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState([]);
  const inputRefs = useRef([]);
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
                onClick={() => {generateSeedPhrase(setSeedPhrase, setIsWalletCreated, setView)}}
              />
              <Button text={"Import Wallet"} type="button" onClick={importSeedPhrase} />
            </div>
          </div>
        )}
        {view === "seedPhrase" && <CreateMenominc seedphraseArr={seedPhrase} />}
        {view === "import" && <ImportMemonic/>}
      </CryptoVault>
    </div>
  );
}

export default Signin;
