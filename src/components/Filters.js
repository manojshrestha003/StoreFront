"use client";
import { useEffect, useState } from "react";

export default function Filters({ onCategoryChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  return (
    <select
      onChange={(e) => onCategoryChange(e.target.value)}
      className="w-full md:w-48 px-4 py-2 rounded-lg border border-gray-300 shadow-sm card text-color focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
    >
      <option value="">All Categories</option>
      {categories.map((c) => (
        <option key={c} value={c}>
          {c.charAt(0).toUpperCase() + c.slice(1)}
        </option>
      ))}
    </select>
  );
}
