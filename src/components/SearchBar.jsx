import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch, onViewAll }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = async (value) => {
    setQuery(value);
    if (value.trim()) {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${value}`
        );
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.slice(0, 5));
          setShowDropdown(true);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
    onSearch(value);
  };

  return (
    <div className="relative w-full max-w-[180px] sm:max-w-md" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Search Countries..."
          className="w-full px-3 sm:px-4 py-1.5 sm:py-2 pl-8 sm:pl-10 pr-2 sm:pr-4 text-sm sm:text-base text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        />
        <Search className="absolute left-2 sm:left-3 top-1.5 sm:top-2.5 text-gray-400" size={16} />
      </div>

      {showDropdown && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg">
          {suggestions.map((country, index) => (
            <div
              key={index}
              className="flex items-center px-2 sm:px-4 py-1.5 sm:py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setQuery(country.name.common);
                setShowDropdown(false);
                onSearch(country.name.common);
              }}
            >
              <img
                src={country.flags.svg}
                alt={`${country.name.common} flag`}
                className="w-4 h-3 sm:w-6 sm:h-4 mr-2"
              />
              <span className="text-sm sm:text-base truncate">
                {country.name.common}
              </span>
            </div>
          ))}
          <div
            className="px-2 sm:px-4 py-1.5 sm:py-2 text-blue-600 text-sm sm:text-base font-semibold cursor-pointer hover:bg-gray-100 text-center border-t"
            onClick={() => {
              onViewAll(suggestions);
              setShowDropdown(false);
            }}
          >
            View all results
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;