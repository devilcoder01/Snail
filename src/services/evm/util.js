import { HDNodeWallet, Wallet } from "ethers";

export const deriveEthereumWallet = (seed, derivationPath) => {
  const privateKey = deriveEthereumPrivateKey(seed, derivationPath);
  return new Wallet(privateKey);
};

export const deriveEthereumPrivateKey = (seed, derivationPath) => {
  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(derivationPath);
  return child.privateKey;
};

/**
 * Validate an Ethereum private key
 */
export const getEthereumWallet = (privateKey) => {
  let wallet;
  try {
    wallet = new Wallet(privateKey);
  } catch {
    throw new Error("Invalid Ethereum private key");
  }
  return wallet;
};
