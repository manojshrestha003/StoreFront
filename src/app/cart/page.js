
"use client";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, total } = useCart();

  if (cart.length === 0)
    return (
      <p className="p-10 text-center text-color text-lg">
        Your cart is empty
      </p>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-color">Your Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-6 border card rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-20 w-20 object-contain rounded bg-white"
            />
            <div className="flex-1">
              <p className="font-semibold text-color line-clamp-1">
                {item.title}
              </p>
              <p className="text-green-600 font-medium">${item.price}</p>
              <div className="mt-2 flex items-center gap-2">
                <label className="text-sm text-gray-600">Qty:</label>
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => updateQty(item.id, +e.target.value)}
                  className="border rounded px-2 py-1 w-16 text-center focus:ring focus:ring-blue-300"
                />
              </div>
            </div>
            <div className="text-right">
             
              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-2 cursor-pointer btn text-sm font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="mt-8 p-6 card shadow-sm text-right">
        <p className="text-2xl font-bold text-color">
          Total: <span className="text-green-600">${total.toFixed(2)}</span>
        </p>
        <button className="mt-4 px-6 py-3 cursor-pointer  btn text-white font-semibold rounded-lg shadow-md transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
