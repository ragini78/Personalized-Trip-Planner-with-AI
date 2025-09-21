// src/components/Footer.jsx
import React from 'react';
import { Plane } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center mb-6">
          <Plane className="w-8 h-8 text-white/80 mb-2" />
          <h3 className="text-xl font-bold">AI Trip Planner</h3>
          <p className="text-sm text-white/40 mt-1">Your next adventure, planned in minutes.</p>
        </div>
        <div className="flex justify-center space-x-6 text-white mb-6">
         <a href="#" className="">About Us</a>
         <a href="#" className="hover:text-blue-300 transition-colors">Contact</a>
         <a href="#" className="hover:text-blue-300 transition-colors">Privacy Policy</a>
         <a href="#" className="hover:text-blue-300 transition-colors">Terms of Service</a>
        </div>
        <div className="border-t border-gray-700 pt-6 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} AI Trip Planner. All rights reserved.
        </div>
      </div>
    </footer>
  );
}