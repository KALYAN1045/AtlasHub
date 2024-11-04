import React from "react";
import { Heart } from "lucide-react";

const FavoritesList = ({ favorites, onRemove }) => {
  if (favorites.length === 0) return null;
  return (
    <div className="fixed right-5 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-lg p-2 flex flex-col items-center space-y-4 overflow-y-auto">
      {favorites.map((country) => (
        <div
          key={country.cca3}
          className="relative group cursor-pointer"
          onClick={() => onRemove(country)}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
            <img
              src={country.flags.svg}
              alt={`${country.name.common} flag`}
              className="w-full h-full object-cover rounded-full"
            />
            {/* Black overlay on hover */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-full" />
          </div>
          {/* Centered heart that shows on hover */}
          <Heart className="absolute inset-0 m-auto text-red-500 fill-current opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-6 h-6 z-10" />
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
