"use client";
import { useState, useEffect } from "react";

export default function SearchBar({ value, onChange }) {
  const [temp, setTemp] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => onChange(temp), 400);
    return () => clearTimeout(timeout);
  }, [temp]);

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={temp}
      onChange={(e) => setTemp(e.target.value)}
      className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 placeholder-gray-400 text-gray-700"
    />
  );
}
