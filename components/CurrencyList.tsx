// app/components/CurrencyList.tsx
import React from "react";

interface Currency {
  currency: string;
  nameI18N: string;
  exchangeRate: { middle: number };
  flags: string;
}

interface CurrencyListProps {
  currencies: Currency[];
}

const CurrencyList: React.FC<CurrencyListProps> = ({ currencies }) => {
  return (
    <ul className="grid grid-cols-1 gap-4 p-4 text-black md:grid-cols-2 lg:grid-cols-3">
      {currencies.map((currency) => (
        <li
          key={currency.currency}
          className="flex items-center space-x-4 rounded-lg bg-white p-4 shadow"
        >
          <img
            src={currency.flags}
            alt={`${currency.currency} flag`}
            className="size-10"
          />
          <div>
            <h2 className="text-lg font-bold">{currency.nameI18N}</h2>
            <p>{currency.currency}</p>
            <p>
              Exchange Rate:{" "}
              {(currency.exchangeRate?.middle * 115.8).toFixed(2)} KES
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CurrencyList;
