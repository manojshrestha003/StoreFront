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
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-color text-center sm:text-left">
        Your Cart
      </h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border card rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            {/* Product Image */}
            <img
              src={item.image}
              alt={item.title}
              className="h-24 w-24 sm:h-20 sm:w-20 object-contain rounded bg-white mx-auto sm:mx-0"
            />

            {/* Product Details */}
            <div className="flex-1 text-center sm:text-left">
              <p className="font-semibold text-color line-clamp-1">
                {item.title}
              </p>
              <p className="text-green-600 font-medium">${item.price}</p>
              <div className="mt-2 flex justify-center sm:justify-start items-center gap-2">
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

            {/* Remove Button */}
            <div className="text-center sm:text-right">
              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-2 cursor-pointer btn text-sm font-medium w-full sm:w-auto"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="mt-8 p-4 sm:p-6 card shadow-sm text-center sm:text-right">
        <p className="text-xl sm:text-2xl font-bold text-color">
          Total:{" "}
          <span className="text-green-600">${total.toFixed(2)}</span>
        </p>
        <button className="mt-4 w-full sm:w-auto px-6 py-3 cursor-pointer btn text-white font-semibold rounded-lg shadow-md transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
