import React from "react";
import { Heart } from "lucide-react";

const CountryCard = ({ country, toggleFavorite, favorites }) => {
  return (
    <div className="transform-gpu hover:scale-105 transition-transform duration-300 will-change-transform">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg">
        <div className="relative h-48">
          <img
            src={country.flags.svg}
            alt={`${country.name.common} flag`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(country);
            }}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg z-10"
          >
            <Heart
              className={`w-5 h-5 ${
                favorites.some((f) => f.cca3 === country.cca3)
                  ? "text-red-500 fill-current"
                  : "text-gray-400"
              }`}
            />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {country.name.common}
          </h2>
          <div className="text-sm text-gray-600">
            <p>Capital: {country.capital?.[0] || "N/A"}</p>
            <p>Region: {country.region}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;