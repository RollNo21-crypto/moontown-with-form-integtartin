import React from 'react';
import Navbar from '../components/Navbar';
import PricingDetails from '../components/PricingDetails';
import Footer from '../components/Footer';

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <PricingDetails />
      </div>
      <Footer />
    </div>
  );
}