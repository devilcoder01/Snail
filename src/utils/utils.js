// Handles individual input changes
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { WalletAuthentication } from "./Authentication";

export const handleInputChange = (
  secretKeyArray,
  setSecretKeyArray,
  index,
  value
) => {
  const newArray = [...secretKeyArray];
  newArray[index] = value;
  setSecretKeyArray(newArray);
};

// Handles paste functionality
export const handlePaste = async (setSecretKeyArray) => {
  try {
    const text = await navigator.clipboard.readText();
    const words = text.split(" ");
    if (words.length === 12) {
      setSecretKeyArray(words);
    } else {
      alert("Clipboard text must contain exactly 12 words.");
    }
  } catch (error) {
    console.error("Failed to paste text:", error);
    alert("Could not access clipboard");
  }
};

// Handles the "Next" button click
export const handleNext = (secretKeyArray, inputRefs) => {
  const filledArray = secretKeyArray.map((word, index) => {
    const trimmedValue = inputRefs.current[index]?.value.trim() || "";
    return trimmedValue;
  });

  if (filledArray.every((val) => val == "")) {
    alert("Please fill all input fields");
  } else {
    const phrase = secretKeyArray;
    localStorage.setItem("walletSeedPhrase", phrase);
    // <WalletAuthentication/>
  }
};

export const generateSeedPhrase = (setSeedPhrase, setView) => {
  setView("seedPhrase");
  const phrase = generateMnemonic();
  const words = phrase.split(" ");
  setSeedPhrase(words);
  localStorage.setItem("walletSeedPhrase", phrase);
};


