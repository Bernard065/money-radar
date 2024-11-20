import Image from "next/image";
import React from "react";

interface Currency {
  currency: string;
  nameI18N: string;
  exchangeRate: {
    buy: number;
    middle: number;
    sell: number;
  };
  flags: string;
}

const CurrencyCard = ({ currency }: { currency: Currency }) => {
  return (
    <div className="flex flex-col items-center justify-between rounded-lg bg-white p-4 shadow-md">
      <Image
        src={currency.flags}
        alt={currency.nameI18N}
        width={40}
        height={40}
      />

      <h2 className="mt-2 text-xl font-semibold">{currency.nameI18N}</h2>
      <p className="text-sm text-gray-500">{currency.currency}</p>
      <div className="mt-2 text-lg font-medium">
        <p>Buy Rate: {currency.exchangeRate.buy.toFixed(2)} KES</p>
        <p>Sell Rate: {currency.exchangeRate.sell.toFixed(2)} KES</p>
      </div>
    </div>
  );
};

export default CurrencyCard;
