import React, { useState, useRef } from "react";
import { Filter } from "lucide-react";
import FilterDropdown from "./FilterDropdown";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import gif from "../assets/Globe.gif"


const Navbar = ({
  getAllRegions,
  getAllLanguages,
  selectedRegion,
  handleRegionFilter,
  selectedLanguage,
  handleLanguageFilter,
  handleSearch,
  filterCountries,
  resetToHomePage,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const filterButtonRef = useRef(null);
  const navigate = useNavigate();
  
  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <nav className="bg-white shadow-md relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer"
            onClick={() => {
              resetToHomePage();
              navigate("/");
            }}>
            <img src={gif} alt="Globe GIF" className="w-6 h-6 mr-4" />
            <h1 className="text-2xl font-bold text-gray-800">
              AtlasHub
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <SearchBar onSearch={handleSearch} onViewAll={filterCountries} />
            <div className="relative">
              <button
                ref={filterButtonRef}
                onClick={toggleFilters}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  showFilters
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                aria-expanded={showFilters}
                aria-label="Toggle filters"
              >
                <Filter className="w-5 h-5" />
              </button>
              {showFilters && (
                <div className="absolute right-0 mt-2 w-72 z-50">
                  <div className="relative bg-white rounded-lg shadow-xl border border-gray-200 p-4 space-y-2">
                    <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45" />
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Region
                        </label>
                        <FilterDropdown
                          options={getAllRegions()}
                          value={selectedRegion}
                          onChange={handleRegionFilter}
                          label="Select Region"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Language
                        </label>
                        <FilterDropdown
                          options={getAllLanguages()}
                          value={selectedLanguage}
                          onChange={handleLanguageFilter}
                          label="Select Language"
                          className="w-full"
                        />
                      </div>
                      <button
                        onClick={() => {
                          handleRegionFilter("");
                          handleLanguageFilter("");
                        }}
                        className="w-full mt-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 
                                  hover:bg-gray-50 rounded-md transition-colors duration-200
                                  border border-gray-200"
                      >
                        Reset Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;