// src/components/Header.jsx
import React from 'react';
import { Plane } from 'lucide-react'; // Make sure this is imported

export default function Header() {
  return (
    <div className="flex flex-col items-center p-4 pt-16 text-center relative">
      

      {/* Main Header Content - Centered */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          {/* The 'bg-white' class is moved here to the div */}
          <div className="p-4 rounded-full bg-white border-2 border-black shadow-md">
            {/* The 'text-black' class is correctly applied to the Plane icon */}
            <Plane className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">AI Trip Planner</h1>
        </div>
        <p className="text-xl bg-clip-text  bg-gradient-to-r from-green-400 to-green-600/80 max-w-3xl mx-auto">
          Let artificial intelligence create your perfect travel experience. Answer a few questions and get a personalized itinerary in minutes.
        </p>
      </div>
    </div>
  );
}