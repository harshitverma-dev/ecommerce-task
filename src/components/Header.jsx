import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
//   const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartItemCount = cartItems.length;


  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to="/" className="text-2xl font-bold">
          Ecommerce website
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Link
              to="/"
              className="hover:text-blue-200 transition-colors duration-200"
            >
              Home
            </Link>
            
            {/* Cart Link with Counter */}
            <Link
              to="/cart"
              className="flex items-center hover:text-blue-200 transition-colors duration-200"
            >
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="ml-2">Cart</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;