"use client";

import { useState, useMemo, useCallback } from "react";

import { Currency } from "@/types"; // Import types from shared file

import CurrencyList from "./CurrencyList";
import Header from "./Header";
import SearchBar from "./SearchBar";

interface CurrencyPageProps {
  initialCurrencies: Currency[];
}

const CurrencyPage = ({ initialCurrencies }: CurrencyPageProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCurrencies = useMemo(() => {
    return initialCurrencies.filter((currency) =>
      currency.nameI18N?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [initialCurrencies, searchTerm]);

  // Handle the search input change
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SearchBar onSearch={handleSearch} />
      <CurrencyList currencies={filteredCurrencies} />
    </div>
  );
};

export default CurrencyPage;
