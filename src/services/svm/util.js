
import {
  ComputeBudgetProgram,
  Keypair,
  Transaction,
  TransactionMessage,
  VersionedMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
// import { Buffer } from "buffer";
// export type SolanaFeeConfig = { computeUnits: number; priorityFee: bigint };

// Returns the account Keypair for the given seed and derivation path.
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
