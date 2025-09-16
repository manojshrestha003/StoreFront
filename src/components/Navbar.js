"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-500 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight hover:text-blue-200 transition"
          >
            Store 
          </Link>

          {/* Hamburger Button (Mobile) */}
          <button
            className="sm:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Links Desktop*/}
          <div className="hidden sm:flex items-center space-x-6">
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
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 3h2l.9 2M7 13h10l3-7H8.1" />
    <circle cx="10" cy="19" r="1.5" />
    <circle cx="18" cy="19" r="1.5" />
  </svg>

  {totalItems > 0 && (
    <span className="absolute -top-2 -right-3 bg-red-500 text-xs font-bold rounded-full px-2 py-0.5 animate-pulse shadow-lg">
      {totalItems}
    </span>
  )}
</Link>

            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-3 space-y-2 bg-gray-600">
          <Link
            href="/"
            className="block text-white hover:text-blue-200 transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>

         <Link
  href="/cart"
  className="relative flex items-center text-white hover:text-blue-200 transition font-medium"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 3h2l.9 2M7 13h10l3-7H8.1" />
    <circle cx="10" cy="19" r="1.5" />
    <circle cx="18" cy="19" r="1.5" />
  </svg>

  {totalItems > 0 && (
    <span className="absolute -top-2 -right-3 bg-red-500 text-xs font-bold rounded-full px-2 py-0.5 animate-pulse shadow-lg">
      {totalItems}
    </span>
  )}
</Link>


          <ThemeToggle />
        </div>
      )}
    </nav>
  );
}
