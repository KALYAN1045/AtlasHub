import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CountryDetails from "./components/CountryDetails";
import FavoritesList from "./components/FavoritesList";
import StorageManager from "./utils/StorageManager";
import Navbar from "./components/Navbar";
import "./index.css";
import CountryCard from "./components/CountryCard";

const CountriesApp = () => {
  const [countries, setCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [favorites, setFavorites] = useState(StorageManager.getFavorites());
  const itemsPerPage = 12;

  useEffect(() => {
    fetchAllCountries();
  }, []);

  const fetchAllCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(data);
      setDisplayedCountries(data.slice(0, itemsPerPage));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching countries:", error);
      setLoading(false);
    }
  };

  const getAllLanguages = () => {
    const languages = new Set();
    countries.forEach((country) => {
      if (country.languages) {
        Object.values(country.languages).forEach((lang) => languages.add(lang));
      }
    });
    return Array.from(languages).sort();
  };

  const getAllRegions = () => {
    const regions = new Set(countries.map((country) => country.region));
    return Array.from(regions).sort();
  };

  const filterCountries = (
    query = searchQuery,
    region = selectedRegion,
    language = selectedLanguage
  ) => {
    let filtered = [...countries];

    if (query) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (region) {
      filtered = filtered.filter((country) => country.region === region);
    }

    if (language) {
      filtered = filtered.filter(
        (country) =>
          country.languages &&
          Object.values(country.languages).includes(language)
      );
    }

    setDisplayedCountries(filtered.slice(0, page * itemsPerPage));
  };

  useEffect(() => {
    filterCountries();
  }, [searchQuery, selectedRegion, selectedLanguage, page]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleRegionFilter = (region) => {
    setSelectedRegion(region);
    setSelectedLanguage("");
    setPage(1);
  };

  const handleLanguageFilter = (language) => {
    setSelectedLanguage(language);
    setSelectedRegion("");
    setPage(1);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const toggleFavorite = (country) => {
    const newFavorites = [...favorites];
    const index = newFavorites.findIndex((f) => f.cca3 === country.cca3);

    if (index === -1) {
      if (newFavorites.length < 5) {
        newFavorites.push(country);
      } else {
        alert("You can only have up to 5 favorite countries!");
        return;
      }
    } else {
      newFavorites.splice(index, 1);
    }

    setFavorites(newFavorites);
    StorageManager.setFavorites(newFavorites);
  };

  const resetToHomePage = () => {
    // Reset search and filters
    setSearchQuery("");
    setSelectedRegion("");
    setSelectedLanguage("");
    setPage(1);

    // Reset displayed countries to initial full list
    setDisplayedCountries(countries.slice(0, itemsPerPage));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar
                  getAllRegions={getAllRegions}
                  getAllLanguages={getAllLanguages}
                  selectedRegion={selectedRegion}
                  handleRegionFilter={handleRegionFilter}
                  selectedLanguage={selectedLanguage}
                  handleLanguageFilter={handleLanguageFilter}
                  handleSearch={handleSearch}
                  filterCountries={filterCountries}
                  resetToHomePage={resetToHomePage} // Pass reset function
                />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="text-lg text-gray-600">
                        Loading countries...
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedCountries.map((country) => (
                          <Link
                            key={country.cca3}
                            to={`/country/${country.cca3}`}
                            className="block"
                          >
                            <CountryCard
                              country={country}
                              toggleFavorite={toggleFavorite}
                              favorites={favorites}
                            />
                          </Link>
                        ))}
                      </div>

                      {displayedCountries.length < countries.length && (
                        <div className="flex justify-center mt-8">
                          <button
                            onClick={loadMore}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            Show More
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </main>

                <FavoritesList
                  favorites={favorites}
                  onRemove={toggleFavorite}
                />
              </>
            }
          />
          <Route
            path="/country/:id"
            element={<CountryDetails favorites={favorites} setFavorites={setFavorites}/>}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default CountriesApp;