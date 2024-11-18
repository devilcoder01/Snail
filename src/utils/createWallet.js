import { mnemonicToSeed } from "bip39";
import { HDNodeWallet } from "ethers";
import { deriveSolanaKeypair, deriveSolanaPrivateKey } from "./services.js";

class CryptoWallet {
  constructor(index) {
    this.seedPhrase =
      "9d1bb30d9915702b42118ef19a8bafa4c3949763c211cd29612d8bfc44fd26fd55be14c410b8bda26fb559b33820dd318add648818b0864a3530d9027d728754";
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

// export default CryptoWallet

(async function main() {
  let w = await new CryptoWallet(0);

  let wallet = w.solana.publicKey;
  console.log(wallet);
})();
