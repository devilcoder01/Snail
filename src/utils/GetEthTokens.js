import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "VzR6_MduUElR5YcR7PN94LWmJjVwZvNR",
  network: Network.ETH_MAINNET,
};

const getEthBalances = async (address) => {
  try {
    const alchemy = new Alchemy(config);

    // Step 1: Get token balances
    const balances = await alchemy.core.getTokenBalances(address);

    // Filter tokens with non-zero balance
    const nonZeroBalances = balances.tokenBalances.filter(
      (token) => parseInt(token.tokenBalance) > 0
    );

    // Step 2: Fetch metadata and prices in parallel
    const tokenDetails = await Promise.all(
      nonZeroBalances.map(async (token) => {
        const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);

        // Fetch token price (with fallback)
        let tokenPrice = null;
        try {
          const priceData = await alchemy.prices.getTokenPriceByAddress([
            { network: "eth-mainnet", address: token.contractAddress },
          ]);
          tokenPrice = priceData.data[0]?.prices[0]?.value || null;
        } catch (error) {
          console.warn(`Price not available for token: ${metadata.symbol}`, error);
        }

        // Calculate the token balance in human-readable format
        const balance = (parseInt(token.tokenBalance) / Math.pow(10, metadata.decimals)).toFixed(2);

        return {
          name: metadata.name,
          symbol: metadata.symbol,
          balance: balance,
          price: tokenPrice,
          logo: metadata.logo,
          contractAddress: token.contractAddress,
        };
      })
    );

    return {
      tokens: tokenDetails,
    };
  } catch (error) {
    console.error("Error fetching balances:", error.message);
    throw error;
  }
};

// Example Usage
export default getEthBalances;

