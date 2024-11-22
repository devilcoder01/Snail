import { mnemonicToSeed } from "bip39";
import { HDNodeWallet } from "ethers";
import { deriveSolanaKeypair, deriveSolanaPrivateKey } from "./services.js";

class CryptoWallet {
  constructor(index) {
    this.seedPhrase =
      "";
    this.SolderivePath = `m/44'/501'/${index}'/0'`;
    this.EthederivePath = `m/44'/60'/${index}'/0'`;
  }

  // Ethereum key derivation and access
  get ether() {
    const hdNode = HDNodeWallet.fromSeed(this.seedPhrase);
    const child = hdNode.derivePath(this.EthederivePath);
    return {
      get publicKey() {
        return child.address;
      },
      get privateKey() {
        return child.privateKey;
      },
    };
  }

  // Solana key derivation and access
  get solana() {
    const secretKey = deriveSolanaPrivateKey(
      this.seedPhrase,
      this.SolderivePath
    );
    const keypair = deriveSolanaKeypair(secretKey, this.SolderivePath);

    return {
      get publicKey() {
        return keypair.publicKey.toBase58();
      },
      get privateKey() {
        return secretKey;
      },
    };
  }
}

