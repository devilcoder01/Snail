import { mnemonicToSeed } from 'bip39';
import { HDNodeWallet } from 'ethers';
import { deriveSolanaKeypair, deriveSolanaPrivateKey } from './services.js';

class CryptoWallet {
    constructor(index) {
        this.index = index;
        this.seedPhrase = "eyebrow orchard banana hello asset olive bundle merit tape remind wrestle light"; // Example mnemonic
        this.SolderivePath = `m/44'/501'/${index}'/0'`;
        this.EthederivePath = `m/44'/60'/0'/0/0`;
        this._seed = null;
        this._ethereumKeys = null;
        this._solanaKeys = null;
    }

    // Method to lazily initialize the seed
    async getSeed() {
        if (!this._seed) {
            this._seed = await mnemonicToSeed(this.seedPhrase); // Await the resolved seed
        }
        return this._seed;
    }

    // Ethereum key derivation and access
    async ether() {
        if (!this._ethereumKeys) {
            const seed = await this.getSeed();
            const hdNode = HDNodeWallet.fromSeed(seed);
            const child = hdNode.derivePath(this.EthederivePath);

            this._ethereumKeys = {
                publicKey: child.address,
                privateKey: child.privateKey,
            };
        }

        return {
            publicKey: this._ethereumKeys.publicKey,
            privateKey: this._ethereumKeys.privateKey,
        };
    }

    // Solana key derivation and access
    async solana() {
        if (!this._solanaKeys) {
            const seed = await this.getSeed();
            const secretKey = deriveSolanaPrivateKey(seed, this.SolderivePath);
            const keypair = deriveSolanaKeypair(secretKey, this.SolderivePath);

            this._solanaKeys = {
                publicKey: keypair.publicKey.toBase58(),
                privateKey: secretKey,
            };
        }

        return {
            publicKey: this._solanaKeys.publicKey,
            privateKey: this._solanaKeys.privateKey,
        };
    }
}

export default CryptoWallet;

(async function main() {
    const wallet = new CryptoWallet(0);

    const solanaKeys = await wallet.solana();
    console.log('Solana Keys:', solanaKeys);

    const ethereumKeys = await wallet.ether();
    console.log('Ethereum Keys:', ethereumKeys);
})();
