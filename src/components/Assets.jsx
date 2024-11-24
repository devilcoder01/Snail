import { useState, useEffect, useContext } from 'react';
import AssetItem from './AssteItem';
import TokensContexts from './context/AssetTokens';


const AssetSection = () => {
  const assets = useContext(TokensContexts)

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