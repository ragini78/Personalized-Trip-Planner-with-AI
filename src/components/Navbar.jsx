// src/components/Navbar.jsx
import React from 'react';
import logo from '/img/logo.png'; // Make sure this path is correct

export default function Navbar() {
  return (
    <nav className=" top-0 left-0 w-full z-50 bg-white/5 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo on the left */}
          <div className="flex-shrink-0">
            <a href="/">
              <img className="h-17" src={logo} alt="Tripmind.AI Logo" />
            </a>
          </div>

          {/* Login Button on the right */}
          <div className="flex items-center">
            <a href="/login" className="px-6 py-3 text-sm font-bold rounded-full flex items-center justify-center bg-white !text-green-800 shadow-md hover:bg-green-600  transition-colors duration-200">
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}