import Image from "next/image";
import React from "react";
import { Currency } from "@/types"; // Import types from the shared file

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
          {/* Render flag image if available, else show a placeholder */}
          {currency.flags ? (
            <Image
              src={currency.flags}
              alt={`${currency.nameI18N} flag`} // Improve accessibility by including the currency name
              width={32}
              height={32}
              className="object-contain"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-xs text-gray-600">No Flag</span>
            </div>
          )}

          <div>
            <h2 className="text-lg font-bold">{currency.nameI18N}</h2>
            <p>{currency.currency}</p>

            {/* Only render exchange rates if they exist */}
            {currency.exchangeRate ? (
              <div className="mt-2">
                <p>
                  Buy Rate: {currency.exchangeRate.buy?.toFixed(2) ?? "N/A"} KES
                </p>
                <p>
                  Sell Rate: {currency.exchangeRate.sell?.toFixed(2) ?? "N/A"}{" "}
                  KES
                </p>
              </div>
            ) : (
              <p className="mt-2 text-gray-500">Exchange rates unavailable</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CurrencyList;
