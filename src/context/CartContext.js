"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load from localStorage
  
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  const addToCart = (product) => {
  let message = "";
  setCart((prev) => {
    const existing = prev.find((item) => item.id === product.id);
    if (existing) {
      message = `Increased quantity of ${product.title}`;
      return prev.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
    }
    message = `${product.title} added to cart!`;
    return [...prev, { ...product, qty: 1 }];
  });

  // Call toast outside setCart
  toast.success(message);
};

const removeFromCart = (id) => {
  const item = cart.find((i) => i.id === id);
  setCart((prev) => prev.filter((item) => item.id !== id));

  if (item) toast.error(`${item.title} removed from cart`);
};

const updateQty = (id, qty) => {
  const item = cart.find((i) => i.id === id);
  setCart((prev) =>
    prev.map((item) => (item.id === id ? { ...item, qty } : item))
  );
  if (item) toast.info(`Updated ${item.title} quantity to ${qty}`);
};

  
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
