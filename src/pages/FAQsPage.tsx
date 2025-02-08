import React from 'react';
import Navbar from '../components/Navbar';
import FAQs from '../components/FAQs';
import Footer from '../components/Footer';

export default function FAQsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <FAQs />
      </div>
      <Footer />
    </div>
  );
}