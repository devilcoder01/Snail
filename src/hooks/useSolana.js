import SolanaService from '../services/solana';
import { useState } from 'react';

const solanaService = new SolanaService('mainnet-beta'); // or 'devnet' for testing

export const useSolana = () => {
  const [balance, setBalance] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Use these methods in your components
  const refreshBalance = async (publicKey) => {
    try {
      const lamports = await solanaService.getBalance(publicKey); // Assuming lamports are returned
      const solBalance = parseFloat(lamports / 1_000_000_000); // Convert lamports to SOL
      setBalance(solBalance);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance(0); // Default to 0 if there's an error
    }
  };
  

  // ... other methods

  return {
    balance,
    tokens,
    nfts,
    transactions,
    refreshBalance,
    // ... other methods
  };
};