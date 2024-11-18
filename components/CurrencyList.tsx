"use client";

import React, { useEffect, useState } from "react";

// Define the type for the currency object
interface Currency {
  currency: string;
  precision: number;
  nameI18N?: string;
  exchangeRate?: {
    buy: number;
    middle: number;
    sell: number;
    indicator: number;
    lastModified: string;
  };
  banknoteRate?: {
    buy: number;
    middle: number;
    sell: number;
    indicator: number;
    lastModified: string;
  };
  flags?: string[];
}

const CurrencyList = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]); // Typing the state as an array of Currency objects

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch("/data/fx.json");
        const data = await response.json();

        setCurrencies(data.fx);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  return (
    <div>
      {currencies.map((c, index) => (
        <div key={index}>
          <p>{c.nameI18N || c.currency}</p>
          {c.flags && typeof c.flags === "string" && (
            <img
              src={c.flags}
              alt={`${c.currency} flag`}
              style={{ width: "50px", height: "30px" }}
            />
          )}
          {c.flags &&
            Array.isArray(c.flags) &&
            c.flags.includes("provided") && (
              <p>Flag data is provided but not specified.</p>
            )}
        </div>
      ))}
    </div>
  );
};

export default CurrencyList;
