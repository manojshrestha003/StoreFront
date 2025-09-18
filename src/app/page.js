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
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setDisplayed(data);
      })
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  // Apply filter, search, sort, and price range
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

    if (minPrice) {
      filtered = filtered.filter((p) => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= parseFloat(maxPrice));
    }

    if (sort === "low") filtered.sort((a, b) => a.price - b.price);
    if (sort === "high") filtered.sort((a, b) => b.price - a.price);

    setDisplayed(filtered);
    setCurrentPage(1);
  }, [search, category, sort, minPrice, maxPrice, products]);

  // Pagination logic
  const totalPages = Math.ceil(displayed.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = displayed.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <SkeletonCard />;
  if (error)
    return <p className="text-center text-red-500 text-lg mt-10">{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Sidebar + Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar (Sticky) */}
        <div className="md:col-span-1">
          <div className="space-y-6 bg-color p-4 rounded-lg shadow-sm sticky top-6">
            <SearchBar value={search} onChange={setSearch} className="w-full" />
            <Filters onCategoryChange={setCategory} className="w-full" />
            <SortDropdown value={sort} onChange={setSort} className="w-full" />

            {/* Price Range Filter */}
            <div className="space-y-2">
              <h3 className="font-semibold text-color">Price Range</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-1/2 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-1/2 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid + Pagination */}
        <div className="md:col-span-3">
          {paginated.length === 0 ? (
            <p className="text-center text-gray-500 text-lg mt-10">
              No products found.
            </p>
          ) : (
            <>
              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    className="transition-transform hover:scale-105 hover:shadow-xl"
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-full  bg-color text-color hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                      currentPage === i + 1
                        ? "bg-green-600 text-white shadow-md"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-full bg-color text-color hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
