import { 
    Connection, 
    PublicKey, 
    Transaction, 
    SystemProgram, 
    LAMPORTS_PER_SOL,
    clusterApiUrl
  } from '@solana/web3.js';
  import { 
    TOKEN_PROGRAM_ID, 
    getAssociatedTokenAddress, 
    createTransferInstruction 
  } from '@solana/spl-token';

  
  class SolanaService {
    constructor(network = 'devnet') {
      this.connection = new Connection(clusterApiUrl(network));
      this.network = network;
    }
  
    /**
     * Get wallet SOL balance
     * @param {string} publicKey - Wallet public key
     * @returns {Promise<number>} Balance in SOL
     */

    async getBalance(publicKey) {
      try {
        const pubKey = new PublicKey(publicKey);
        const balance = await this.connection.getBalance(pubKey);
        return balance / LAMPORTS_PER_SOL;
      } catch (error) {
        console.error('Error getting balance:', error);
        throw new Error('Failed to fetch balance');
      }
    }
  
    /**
     * Get all SPL tokens in the wallet
     * @param {string} publicKey - Wallet public key
     * @returns {Promise<Array>} Array of token data
     */
    async getTokens(publicKey) {
      try {
        const pubKey = new PublicKey(publicKey);
        const tokens = await this.connection.getParsedTokenAccountsByOwner(pubKey, {
          programId: TOKEN_PROGRAM_ID,
        });
  
        return tokens.value.map(accountInfo => {
          const parsedInfo = accountInfo.account.data.parsed.info;
          return {
            mint: parsedInfo.mint,
            owner: parsedInfo.owner,
            amount: parsedInfo.tokenAmount.uiAmount,
            decimals: parsedInfo.tokenAmount.decimals,
            tokenName: parsedInfo.tokenName,
            tokenSymbol: parsedInfo.tokenSymbol,
          };
        });
      } catch (error) {
        console.error('Error getting tokens:', error);
        throw new Error('Failed to fetch tokens');
      }
    }
  
    /**
     * Get NFTs owned by the wallet
     * @param {string} publicKey - Wallet public key
     * @returns {Promise<Array>} Array of NFT data
     */
    async getNFTs(publicKey) {
      try {
        const pubKey = new PublicKey(publicKey);
        const nftAccounts = await this.connection.getParsedTokenAccountsByOwner(pubKey, {
          programId: TOKEN_PROGRAM_ID,
        });
  
        const nfts = [];
        for (const nftAccount of nftAccounts.value) {
          const tokenAmount = nftAccount.account.data.parsed.info.tokenAmount;
          
          // Check if it's an NFT (supply of 1 and 0 decimals)
          if (tokenAmount.decimals === 0 && tokenAmount.uiAmount === 1) {
            const mintAddress = nftAccount.account.data.parsed.info.mint;
            const metadataPDA = await Metadata.getPDA(new PublicKey(mintAddress));
            
            try {
              const metadata = await Metadata.load(this.connection, metadataPDA);
              nfts.push({
                mint: mintAddress,
                metadata: metadata.data,
                tokenAccount: nftAccount.pubkey.toBase58(),
              });
            } catch (e) {
              console.log(`No metadata found for token: ${mintAddress}`);
            }
          }
        }
        
        return nfts;
      } catch (error) {
        console.error('Error getting NFTs:', error);
        throw new Error('Failed to fetch NFTs');
      }
    }
  
    /**
     * Get transaction history
     * @param {string} publicKey - Wallet public key
     * @param {number} limit - Number of transactions to fetch
     * @returns {Promise<Array>} Array of transactions
     */
    async getTransactions(publicKey, limit = 20) {
      try {
        const pubKey = new PublicKey(publicKey);
        const signatures = await this.connection.getSignaturesForAddress(
          pubKey,
          { limit }
        );
  
        const transactions = await Promise.all(
          signatures.map(async (signatureInfo) => {
            const tx = await this.connection.getTransaction(signatureInfo.signature);
            return {
              signature: signatureInfo.signature,
              timestamp: signatureInfo.blockTime,
              successful: signatureInfo.confirmationStatus === 'finalized',
              amount: this.extractTransactionAmount(tx),
              type: this.determineTransactionType(tx, publicKey),
              fee: tx.meta.fee / LAMPORTS_PER_SOL,
            };
          })
        );
  
        return transactions;
      } catch (error) {
        console.error('Error getting transactions:', error);
        throw new Error('Failed to fetch transactions');
      }
    }
  
    /**
     * Send SOL to another wallet
     * @param {string} fromPrivateKey - Sender's private key
     * @param {string} toAddress - Recipient's public key
     * @param {number} amount - Amount in SOL
     * @returns {Promise<string>} Transaction signature
     */
    async sendTransaction(fromPrivateKey, toAddress, amount) {
      try {
        // const senderKeypair = /* decode private key */;
        const recipientPubKey = new PublicKey(toAddress);
        
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: senderKeypair.publicKey,
            toPubkey: recipientPubKey,
            lamports: amount * LAMPORTS_PER_SOL,
          })
        );
  
        // Get latest blockhash
        const { blockhash } = await this.connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = senderKeypair.publicKey;
  
        // Sign and send transaction
        const signature = await this.connection.sendTransaction(
          transaction,
          [senderKeypair]
        );
  
        // Wait for confirmation
        await this.connection.confirmTransaction(signature);
        
        return signature;
      } catch (error) {
        console.error('Error sending transaction:', error);
        throw new Error('Failed to send transaction');
      }
    }
  
    /**
     * Send SPL token
     * @param {string} fromPrivateKey - Sender's private key
     * @param {string} toAddress - Recipient's public key
     * @param {string} tokenMint - Token mint address
     * @param {number} amount - Amount of tokens
     * @returns {Promise<string>} Transaction signature
     */
    async sendToken(fromPrivateKey, toAddress, tokenMint, amount) {
      try {
        // const senderKeypair = /* decode private key */;
        const recipientPubKey = new PublicKey(toAddress);
        const mintPubKey = new PublicKey(tokenMint);
  
        // Get associated token accounts
        const senderATA = await getAssociatedTokenAddress(
          mintPubKey,
          senderKeypair.publicKey
        );
        const recipientATA = await getAssociatedTokenAddress(
          mintPubKey,
          recipientPubKey
        );
  
        const transaction = new Transaction().add(
          createTransferInstruction(
            senderATA,
            recipientATA,
            senderKeypair.publicKey,
            amount
          )
        );
  
        const { blockhash } = await this.connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = senderKeypair.publicKey;
  
        const signature = await this.connection.sendTransaction(
          transaction,
          [senderKeypair]
        );
  
        await this.connection.confirmTransaction(signature);
        
        return signature;
      } catch (error) {
        console.error('Error sending token:', error);
        throw new Error('Failed to send token');
      }
    }
  
  }
  
  export default SolanaService;
