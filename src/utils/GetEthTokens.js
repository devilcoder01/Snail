import { Alchemy, Network } from "alchemy-sdk";
import { ethers } from "ethers";

const config = {
  apiKey: "VzR6_MduUElR5YcR7PN94LWmJjVwZvNR",
  network: Network.ETH_MAINNET, 
};

const getEthBalances = async (address) => {
  try {
    // Update the network dynamically based on the input
    const alchemyConfig = config  ;
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
      
      let balance = token.tokenBalance / Math.pow(10, metadata.decimals).toFixed(2);
      tokenDetails.push({
        name: metadata.name,
        symbol: metadata.symbol,
        balance: balance,
        logo : metadata.logo,
      });
    }

    // Return the native balance and token balances
    return {
      tokens: tokenDetails,
    };
  } catch (error) {
    console.error("Error fetching balances:", error);
    throw error;
  }
};

export default getEthBalances;

