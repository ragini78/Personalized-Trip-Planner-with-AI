import React from 'react';
import AITripPlanner from './AITripPlanner.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Assuming you have this file
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-white ">
       <Navbar />
      <Header />
      <main className="container mx-auto px-4 py-8">
        <AITripPlanner />
      </main>
      <Footer />
    </div>
  );
}

export default App; // This is the crucial line for the export