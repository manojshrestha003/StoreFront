"use client";
import React, { use, useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext";
import Link from "next/link";
import SkeletonCard from "@/components/SkeletonCard";

export default function ProductDetail({ params }) {
  const { id } = use(params); 
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        fetch(`https://fakestoreapi.com/products/category/${data.category}`)
          .then((res) => res.json())
          .then((rel) =>
            setRelated(rel.filter((p) => p.id !== data.id).slice(0, 4))
          );
      });
  }, [id]);

  if (!product) return <SkeletonCard/>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="flex items-center justify-center card rounded-lg shadow-sm p-6">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-80 object-contain"
          />
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-color">
            {product.title}
          </h1>
          <p className="mt-3 text-2xl text-green-600 font-semibold">
            ${product.price}
          </p>
          <p className="mt-4 text-gray-500 leading-relaxed">
            {product.description}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="mt-6 w-full md:w-auto px-6 py-3 btn text-color font-semibold rounded-lg shadow-md transition cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      <h2 className="mt-12 text-xl md:text-2xl font-bold text-color">
        Related Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
        {related.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg card p-4 shadow-sm hover:shadow-md transition"
          > <Link href={`/product/${p.id}`}>
            <img
              src={p.image}
              alt={p.title}
              className="h-32 mx-auto object-contain"
            />
            </Link>
            <p className="mt-2 text-sm font-medium text-color truncate">
              {p.title}
            </p>
            <p className="text-green-600 font-semibold mt-1">${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
