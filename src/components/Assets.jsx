import { useState, useEffect } from 'react';
import getEthBalances from '../utils/GetEthTokens';
import AssetItem from './AssteItem';

const AssetSection = () => {
  // const SolpublicKey = "9XaXs4Ds8VCpuU6hjN1fKvnYv13EWCeuupejwSqkxDA4";
  const EthPublicKey = "0xeF5c67E6dBb6Fd6CfB9C93ADbc5801bcfc10c494";
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const { tokens } = await getEthBalances(EthPublicKey);
        setAssets(tokens);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, []);

  return (
    <div className="w-auto max-w-4xl mx-auto p-2 ">
      <div className="grid grid-cols-4 gap-4 mb-4 text-sm text-gray-500">
        <div>Asset</div>
        <div className="text-right">Portfolio</div>
        <div className="text-right">Price (24hr)</div>
        <div className="text-right">Balance</div>
      </div>
      <div className="space-y-2 overflow-y-auto h-[calc(100vh-380px)] pr-4">
        {assets.map((asset, index) => (
          <AssetItem
            key={index}
            icon={asset.logo}
            name={asset.name}
            symbol={asset.symbol}
            portfolio={asset.portfolio}
            price={asset.price}
            priceChange={asset.priceChange}
            balance={asset.balance}
          />
        ))}
      </div>
    </div>
  );
};

export default AssetSection;