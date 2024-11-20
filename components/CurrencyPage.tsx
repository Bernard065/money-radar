"use client";

import { useState } from "react";

import CurrencyList from "./CurrencyList";
import Header from "./Header";
import SearchBar from "./SearchBar";

interface Currency {
  currency: string;
  nameI18N: string;
  exchangeRate: { middle: number };
  flags: string;
}

interface CurrencyPageProps {
  initialCurrencies: Currency[];
}

const CurrencyPage: React.FC<CurrencyPageProps> = ({ initialCurrencies }) => {
  const [filteredCurrencies, setFilteredCurrencies] =
    useState(initialCurrencies);

  const handleSearch = (term: string) => {
    setFilteredCurrencies(
      initialCurrencies.filter((currency) =>
        currency.nameI18N?.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SearchBar onSearch={handleSearch} />
      <CurrencyList currencies={filteredCurrencies} />
    </div>
  );
};

export default CurrencyPage;
