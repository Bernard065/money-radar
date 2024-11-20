import Image from "next/image";
import React from "react";

interface ExchangeRate {
  buy: number;
  middle: number;
  sell: number;
}
interface Currency {
  currency: string;
  nameI18N: string;
  exchangeRate: ExchangeRate;
  flags: string;
}

interface CurrencyListProps {
  currencies: Currency[];
}

const CurrencyList = ({ currencies }: CurrencyListProps) => {
  return (
    <ul className="grid grid-cols-1 gap-4 p-4 text-black md:grid-cols-2 lg:grid-cols-3">
      {currencies.map((currency) => (
        <li
          key={currency.currency}
          className="flex items-center space-x-4 rounded-lg bg-white p-4 shadow"
        >
          {currency.flags ? (
            <Image
              src={currency.flags}
              alt="flag"
              width={32}
              height={32}
              className="object-contain"
            />
          ) : (
            <div className="size-8 rounded-full bg-gray-300" />
          )}
          <div>
            <h2 className="text-lg font-bold">{currency.nameI18N}</h2>
            <p>{currency.currency}</p>
            <div className="mt-2">
              <p>Buy Rate: {currency.exchangeRate.buy.toFixed(2)} KES</p>
              <p>Sell Rate: {currency.exchangeRate.sell.toFixed(2)} KES</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CurrencyList;
