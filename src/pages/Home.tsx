import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Gallery from '../components/Gallery';
import PricingDetails from '../components/PricingDetails';
import About from '../components/About';
import RefundPolicy from '../components/RefundPolicy';
import FAQs from '../components/FAQs';
import ContactForm from '../components/ContactForm';
import BookingModal from '../components/BookingModal';
import Footer from '../components/Footer';

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
      <Hero onBookNow={() => setIsBookingModalOpen(true)} />
      <Services onBookNow={() => setIsBookingModalOpen(true)} />
      <Gallery />
      <PricingDetails onBookNow={() => setIsBookingModalOpen(true)} />
      <About />
      <RefundPolicy />
      <FAQs />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.9089722759973!2d77.51128657358791!3d12.913571816150862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3fa5cd542397%3A0x5e77e607dfc3cd32!2sMoonTown%20Private%20Theatre!5e0!3m2!1sen!2sin!4v1738636343070!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}