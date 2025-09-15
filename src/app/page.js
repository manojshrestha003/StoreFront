"use client";
import { useEffect, useState } from "react";
import { getProducts } from "../lib/api";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";
import SkeletonCard from "@/components/SkeletonCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setDisplayed(data);
      })
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  // Apply filters/search/sort
  useEffect(() => {
    let filtered = [...products];
    if (search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (sort === "low") filtered.sort((a, b) => a.price - b.price);
    if (sort === "high") filtered.sort((a, b) => b.price - a.price);
    setDisplayed(filtered);
  }, [search, category, sort, products]);

  if (loading)
    return <SkeletonCard/>
  if (error)
    return <p className="text-center text-red-500 text-lg mt-10">{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          className="flex-1 md:max-w-xs"
        />
        <Filters onCategoryChange={setCategory} className="md:w-1/4" />
        <SortDropdown value={sort} onChange={setSort} className="md:w-1/4" />
      </div>

      {/* Product Grid */}
      {displayed.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayed.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="transition-transform hover:scale-105 hover:shadow-xl"
            />
          ))}
        </div>
      )}
    </div>
  );
}
