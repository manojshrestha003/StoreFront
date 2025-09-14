"use client";
import { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext";

export default function ProductDetail({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
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

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <img src={product.image} alt={product.title} className="w-full h-80 object-contain" />
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-xl text-green-600">${product.price}</p>
          <p className="text-gray-600">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <h2 className="mt-10 text-xl font-bold">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {related.map((p) => (
          <div key={p.id} className="border bg-amber-50 p-2 rounded">
            <img src={p.image} className="h-32 mx-auto object-contain"  />
            <p className="truncate">{p.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
