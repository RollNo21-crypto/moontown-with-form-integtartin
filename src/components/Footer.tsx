import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MoonTown</h3>
            <p className="text-gray-400">Experience cinema like never before</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>opp. Sri jnanakshi vidyamandir,</li>
              <li>Janankshi Layout, 5th Stage,</li>
              <li>Rajarajeshwari Nagar,</li>
              <li>Bengaluru, Karnataka 560098</li>
              <li>+91 9606993278</li>
              <li>support@moontown.com</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Location</h4>
            <div className="w-full h-[300px] rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.9089722759973!2d77.51128657358791!3d12.913571816150862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3fa5cd542397%3A0x5e77e607dfc3cd32!2sMoonTown%20Private%20Theatre!5e0!3m2!1sen!2sin!4v1738636343070!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} MoonTown. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}