"use client";

import { useState, useEffect, useCallback } from "react";

import CurrencyList from "./CurrencyList";
import Header from "./Header";
import SearchBar from "./SearchBar";

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

interface CurrencyPageProps {
  initialCurrencies: Currency[];
}

const CurrencyPage = ({ initialCurrencies }: CurrencyPageProps) => {
  const [filteredCurrencies, setFilteredCurrencies] =
    useState<Currency[]>(initialCurrencies);

  // Use useCallback to memoize the handleSearch function and prevent unnecessary re-renders
  const handleSearch = useCallback((term: string) => {
    setFilteredCurrencies((prevCurrencies) =>
      prevCurrencies.filter((currency) =>
        currency.nameI18N?.toLowerCase().includes(term.toLowerCase())
      )
    );
  }, []);

  useEffect(() => {
    setFilteredCurrencies(initialCurrencies);
  }, [initialCurrencies]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SearchBar onSearch={handleSearch} />
      <CurrencyList currencies={filteredCurrencies} />
    </div>
  );
};

export default CurrencyPage;
