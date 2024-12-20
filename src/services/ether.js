import { Alchemy, BigNumber, Network } from "alchemy-sdk";
import { ethers } from "ethers";

const config = {
  apiKey: "VzR6_MduUElR5YcR7PN94LWmJjVwZvNR", // Replace with your Alchemy API key
};

const getBalances = async (address, network) => {
  try {
    // Update the network dynamically based on the input
    const alchemyConfig = { ...config, network };
    const alchemy = new Alchemy(alchemyConfig);

    // Get the native coin balance (e.g., ETH or MATIC, depending on the network)
    // const nativeBalanceWei = await alchemy.core.getBalance(address);
    // const nativeBalance = ethers.utils.formatEther(nativeBalanceWei);

    // Get token balances
    const balances = await alchemy.core.getTokenBalances(address);    
    // Filter tokens with non-zero balance
    const nonZeroBalances = balances.tokenBalances.filter((token) => parseInt(token.tokenBalance) > 0);
    const tokenDetails = [];
    for (let token of nonZeroBalances) {
      const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);
      let balance = token.tokenBalance / Math.pow(10, metadata.decimals);
      balance = balance.toFixed(2);
      tokenDetails.push({
        name: metadata.name,
        symbol: metadata.symbol,
        balance: balance,
      });
    }

    // Return the native balance and token balances
    return {
    //   nativeCoin: {
    //     symbol: network === Network.MATIC_MAINNET ? "MATIC" : "ETH",
    //     balance: nativeBalance,
    //   },
      tokens: tokenDetails,
    };
  } catch (error) {
    console.error("Error fetching balances:", error);
    throw error;
  }
};

// Example usage
(async () => {
  const address = "0xeF5c67E6dBb6Fd6CfB9C93ADbc5801bcfc10c494";
  const network = Network.ETH_MAINNET; // Use Network.MATIC_MAINNET for Polygon, etc.

  const balances = await getBalances(address, network);

  console.log("Native Coin Balance:", balances.nativeCoin);
  console.log("Token Balances:");
  balances.tokens.forEach((token, index) => {
    console.log(`${index + 1}. ${token.name}: ${token.balance} ${token.symbol}`);
  });
})();
