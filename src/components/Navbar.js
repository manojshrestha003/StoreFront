"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import ThemeToggle from "./ThemeToggle";


export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="bg-gray-500 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight hover:text-blue-200 transition">
            MyStore
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-white hover:text-blue-200 transition font-medium"
            >
              Home
            </Link>

            <Link
              href="/cart"
              className="relative flex items-center text-white hover:text-blue-200 transition font-medium"
            >
               <img src="assets/CartIcon.png" alt="Cart" className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-xs font-bold rounded-full px-2 py-0.5 animate-pulse shadow-lg">
                  {totalItems}
                </span>
              )}
            </Link>
            <ThemeToggle/>
          </div>
          
        </div>
      </div>
    </nav>
  );
}
