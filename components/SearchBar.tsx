// app/components/SearchBar.tsx
"use client";

import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const hashQuery = window.location.hash.replace("#", "");
    setSearchTerm(hashQuery);
    onSearch(hashQuery);
  }, [onSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    window.location.hash = query;
    onSearch(query);
  };

  return (
    <div className="sticky top-0 z-10 bg-white p-4 shadow-md">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search currencies..."
        className="w-full rounded-md border p-2"
      />
    </div>
  );
};

export default SearchBar;
