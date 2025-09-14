"use client";
import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { updateQty, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 border p-2 rounded">
      <img src={item.image} className="h-16 w-16 object-contain" />
      <div className="flex-1">
        <p className="font-semibold">{item.title}</p>
        <p>${item.price}</p>
        <input
          type="number"
          min="1"
          value={item.qty}
          onChange={(e) => updateQty(item.id, +e.target.value)}
          className="border px-2 w-16"
        />
      </div>
      <p className="font-bold">${(item.price * item.qty).toFixed(2)}</p>
      <button onClick={() => removeFromCart(item.id)} className="text-red-500">
        Remove
      </button>
    </div>
  );
}
