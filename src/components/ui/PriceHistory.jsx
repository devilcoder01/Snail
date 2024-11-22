import React from 'react'

function PriceHistory({ percentage }) {
    const isPositive = percentage >= 0;
    return (
      <span className={`${isPositive ? 'text-green-500' : 'text-red-500'} text-sm`}>
        {isPositive ? '↑' : '↓'} {Math.abs(percentage)}%
      </span>
    );
}

export default PriceHistory