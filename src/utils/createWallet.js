import { generateMnemonic, mnemonicToSeed } from "bip39";
 
const mnemonic = generateMnemonic()
const CreateWallet = () => {
    const seed = mnemonicToSeed(mnemonic);
    // Solana Derivation Pathe
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);
    setCurrentIndex(currentIndex + 1);
    setAddresses([...addresses, wallet.address]);
  };

console.log(mnemonic)