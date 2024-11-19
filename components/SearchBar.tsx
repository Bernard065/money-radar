import React from "react";

const SearchBar = () => {
  return (
    <div className="sticky top-0 z-50 shadow-md">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search for a currency..."
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default SearchBar;
