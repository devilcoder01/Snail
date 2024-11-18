import {
  Keypair,
  Transaction,
  TransactionMessage,
  VersionedMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { HDNodeWallet, Wallet } from "ethers";

export const deriveSolanaKeypair = (seed, derivationPath) => {
  const secret = deriveSolanaPrivateKey(seed, derivationPath);
  return Keypair.fromSecretKey(secret);
};

export const deriveSolanaPrivateKey = (seed, derivationPath) => {
  let derivedSeed;
  if (!derivationPath) {
    throw new Error("Derivation path is required");
  }
  const seedHex = Buffer.isBuffer(seed) ? seed.toString("hex") : seed;
  derivedSeed = derivePath(derivationPath, seedHex).key;
  return nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
};

export const getSolanaKeypair = (privateKey) => {
  if (!privateKey) {
    throw new Error("Private key is required");
  }

  let keypair;
  try {
    // Attempt to create a keypair from JSON secret key
    keypair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(privateKey)));
  } catch (error) {
    try {
      // Attempt to create a keypair from hex decode of secret key
      keypair = Keypair.fromSecretKey(Buffer.from(privateKey, "hex"));
    } catch (finalError) {
      throw new Error("Invalid Solana private key format");
    }
  }

  return keypair;
};

export const deriveEthereumWallet = (seed, derivationPath) => {
  const privateKey = deriveEthereumPrivateKey(seed, derivationPath);
  return new Wallet(privateKey);
};

export const deriveEthereumPrivateKey = (seed, derivationPath) => {
  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(derivationPath);
  return child.privateKey;
};

export async function generateAddr(mnemonic) {
  try {
    if (!mnemonic) {
      throw new Error("Mnemonic is required");
    }

    const path = `m/44'/501'/0'/0'`;
    const EthPath = `m/44'/60'/0'/0/2`;
    const seed = await mnemonicToSeed(mnemonic); // Wait for the Promise to resolve
    const keypair = deriveSolanaKeypair(seed, path);
    const ethKeypair = deriveEthereumWallet(seed, EthPath);

    return {
      publicKey: keypair.publicKey.toBase58(),
      secretKey: Buffer.from(keypair.secretKey).toString("hex"),
      ethpublicKey: ethKeypair.address,
    };
  } catch (error) {
    console.error("Error generating address:", error);
    throw error;
  }
}
async function example() {
  try {
    const result = await generateAddr(
      "eyebrow orchard banana hello asset olive bundle merit tape remind wrestle light"
    );
    console.log("Generated address:", result);
  } catch (error) {
    console.error("Failed to generate address:", error);
  }
}

example();
