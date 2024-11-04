import React from "react";

const FilterDropdown = ({ options, value, onChange, label, className = "" }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`
        block w-full px-3 py-2 text-base
        border border-gray-300 rounded-md
        bg-white shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        ${className}
      `}
      aria-label={label}
    >
      <option value="">{label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default FilterDropdown;