import React from "react";

import CurrencyList from "@/components/CurrencyList";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <SearchBar />
      <CurrencyList />
    </div>
  );
};

export default Home;
