import React from 'react';
import Navbar from '../components/Navbar';
import RefundPolicy from '../components/RefundPolicy';
import Footer from '../components/Footer';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <RefundPolicy />
      </div>
      <Footer />
    </div>
  );
}