import React from "react";
import PriceHistory from "./ui/PriceHistory";
function AssetItem({
  icon,
  name,
  symbol,
  portfolio,
  price,
  priceChange,
  balance,
}) {

  
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
      <div className="flex items-center space-x-3 w-1/4 ">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[12px] font-bold">
          {icon ? (
            <img
              src={icon}
              alt={`${name} logo`}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            "N/A"
          )}
        </div>
        <div>
          <div className="font-medium">{symbol}</div>
          <div className="text-sm text-gray-500">{name}</div>
        </div>
      </div>
      <div className="text-right w-1/4">
        <div>{portfolio}%</div>
      </div>
      <div className="text-right w-1/4">
        <div className="flex flex-col text-[13px] font-medium items-end">
          <div>${price}</div>
          <PriceHistory percentage={priceChange} />
        </div>
      </div>
      <div className="text-right w-1/4 text-[13px] font-medium">
        <div>{balance.toLocaleString()}</div>
      </div>
    </div>
  );
}

export default AssetItem;
