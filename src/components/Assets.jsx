import React from 'react';

const PriceChange = ({ percentage }) => {
  const isPositive = percentage >= 0;
  return (
    <span className={`${isPositive ? 'text-green-500' : 'text-red-500'} text-sm`}>
      {isPositive ? '↑' : '↓'} {Math.abs(percentage)}%
    </span>
  );
};

const AssetItem = ({ icon, name, symbol, portfolio, price, priceChange, balance }) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
      <div className="flex items-center space-x-3 w-1/4">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-gray-500">{symbol}</div>
        </div>
      </div>
      <div className="text-right w-1/4">
        <div>{portfolio}%</div>
      </div>
      <div className="text-right w-1/4">
        <div className="flex flex-col items-end">
          <div>${price.toLocaleString()}</div>
          <PriceChange percentage={priceChange} />
        </div>
      </div>
      <div className="text-right w-1/4">
        <div>${balance.toLocaleString()}</div>
      </div>
    </div>
  );
};

const AssetSection = () => {
  const assets = [
    {
      name: 'Algorand',
      symbol: 'ALG',
      icon: <span className="text-xl">A</span>,
      portfolio: 20,
      price: 288.60,
      priceChange: 2.5,
      balance: 8.60
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      icon: <span className="text-xl">Ξ</span>,
      portfolio: 5.2,
      price: 2048.60,
      priceChange: -1.8,
      balance: 18.60
    },
    {
      name: 'Atomic',
      symbol: 'ATM',
      icon: <span className="text-xl">⚛</span>,
      portfolio: 15.2,
      price: 156.60,
      priceChange: 3.2,
      balance: 6.60
    },
    {
      name: 'Atomic',
      symbol: 'ATM',
      icon: <span className="text-xl">⚛</span>,
      portfolio: 15.2,
      price: 156.60,
      priceChange: 3.2,
      balance: 6.60
    },
    {
      name: 'Atomic',
      symbol: 'ATM',
      icon: <span className="text-xl">⚛</span>,
      portfolio: 15.2,
      price: 156.60,
      priceChange: 3.2,
      balance: 6.60
    }
  ];

  return (
    <div className="w-auto max-w-4xl mx-auto p-2 ">
      <div className="grid grid-cols-4 gap-4 mb-4 text-sm text-gray-500">
        <div>Asset</div>
        <div className="text-right">Portfolio</div>
        <div className="text-right">Price (24hr)</div>
        <div className="text-right">Balance</div>
      </div>
      <div className="space-y-2 overflow-y-auto h-[calc(100vh-380px)] pr-4">
        {assets.map((asset) => (
          <AssetItem
            key={asset.symbol}
            icon={asset.icon}
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