import React, { useState, useEffect } from "react";
import { Heart, ArrowLeft, Home } from "lucide-react"; // Import Home icon
import { useNavigate, useParams } from "react-router-dom";
import StorageManager from "../utils/StorageManager";
import LoadingSpinner from "./LoadingSpinner";

const InfoItem = ({ label, value }) => (
  <div className="mb-4">
    <span className="font-semibold text-white">{label}: </span>
    <span className="text-gray-200">{value}</span>
  </div>
);

const BorderCountry = ({ code, name }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/country/${code}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex-shrink-0 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
    >
      <span className="text-white">{name}</span>
    </div>
  );
};

const CountryDetails = ({ favorites, setFavorites }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${id}`
        );
        const [data] = await response.json();
        setCountry(data);

        // Fetch border countries if they exist
        if (data.borders && data.borders.length > 0) {
          const borderResponse = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${data.borders.join(
              ","
            )}`
          );
          const borderData = await borderResponse.json();
          setBorderCountries(borderData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching country details:", error);
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [id]);

  const toggleFavorite = () => {
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

  if (true) return <LoadingSpinner />;
  if (!country) return <div>Country not found</div>;

  const isFavorite = favorites.some((f) => f.cca3 === country.cca3);

  // Format currencies
  const currencies = Object.values(country.currencies || {})
    .map((curr) => `${curr.name} (${curr.symbol})`)
    .join(", ");

  // Get native name (using first available native name)
  const nativeName =
    Object.values(country.name.nativeName || {})[0]?.common || "N/A";

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black/40 overflow-hidden">
      {/* Animated Flag Background */}
      <div className="absolute inset-0">
        <div className="flag-container absolute inset-0">
          <div
            className="flag-image"
            style={{
              backgroundImage: `url(${country.flags.svg})`,
            }}
          />
          <div className="flag-wave-overlay" />
        </div>
      </div>

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-white mb-6 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="backdrop-blur-md bg-black/30 rounded-lg shadow-2xl overflow-hidden border border-white/20">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-white">
                {country.name.common}
              </h1>
              <div className="flex items-center space-x-2">
                {/* Home icon button */}
                <button
                  onClick={() => navigate("/")}
                  className="p-2 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/20 transition-colors"
                >
                  <Home className="w-6 h-6 text-gray-400 hover:text-blue-300" />
                </button>

                {/* Favorite icon button */}
                <button
                  onClick={toggleFavorite}
                  className="p-2 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/20 transition-colors"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFavorite ? "text-red-500 fill-current" : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <InfoItem label="Official Name" value={country.name.official} />
                <InfoItem label="Native Name" value={nativeName} />
                <InfoItem
                  label="Capital"
                  value={country.capital?.join(", ") || "N/A"}
                />
                <InfoItem label="Region" value={country.region} />
                <InfoItem
                  label="Subregion"
                  value={country.subregion || "N/A"}
                />
              </div>
              <div>
                <InfoItem
                  label="Population"
                  value={country.population.toLocaleString()}
                />
                <InfoItem
                  label="Area"
                  value={`${country.area.toLocaleString()} km²`}
                />
                <InfoItem
                  label="Languages"
                  value={Object.values(country.languages || {}).join(", ")}
                />
                <InfoItem label="Currencies" value={currencies} />
                <InfoItem
                  label="Top Level Domain"
                  value={country.tld?.join(", ") || "N/A"}
                />
              </div>
            </div>

            {/* Border Countries Section */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Border Countries
              </h2>
              <div
                className="overflow-hidden pb-4"
                onWheel={(e) => {
                  e.preventDefault();
                  const container = e.currentTarget.querySelector(
                    ".border-countries-container"
                  );
                  if (container) {
                    container.scrollLeft += e.deltaY > 0 ? 100 : -100; // Smoother scroll with fixed increment
                  }
                }}
              >
                <div
                  className="flex gap-4 overflow-x-auto border-countries-container scrollbar-hide"
                  style={{
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                  }}
                >
                  <style>
                    {`
          .border-countries-container::-webkit-scrollbar {
            display: none;
          }
        `}
                  </style>
                  {borderCountries.length > 0 ? (
                    borderCountries.map((border) => (
                      <BorderCountry
                        key={border.cca3}
                        code={border.cca3}
                        name={border.name.common}
                      />
                    ))
                  ) : (
                    <span className="text-gray-400">No border countries</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .flag-container {
          transform: scale(1.2) perspective(1000px);
          backface-visibility: hidden;
        }

        .flag-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          animation: wave 8s cubic-bezier(0.16, 0.14, 0.82, 0.73) infinite;
        }

        .flag-wave-overlay {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0) 20%,
            rgba(0, 0, 0, 0.04) 30%,
            rgba(255, 255, 255, 0.2) 40%,
            rgba(255, 255, 255, 0) 60%,
            rgba(255, 255, 255, 0.2) 65%,
            rgba(0, 0, 0, 0.05) 80%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 200% 200%;
          animation: flutter 8s cubic-bezier(0.16, 0.14, 0.82, 0.73) infinite;
        }

        @keyframes flutter {
          0% {
            background-position: -200% 0;
          }
          30% {
            background-position: -60% 5px;
          }
          70% {
            background-position: 70% -5px;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CountryDetails;
