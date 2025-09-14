"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-gray-200 border border-gray-200 rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow duration-300">
      <Link href={`/product/${product.id}`} className="flex-1">
        <div className="relative w-full h-48 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
        <h2 className="mt-3 font-semibold text-gray-800 text-sm md:text-base truncate">
          {product.title}
        </h2>
        <p className="mt-1 text-green-600 font-bold text-lg">${product.price}</p>
      </Link>

      <button
        onClick={() => addToCart(product)}
        className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-300 transition-colors duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
}
