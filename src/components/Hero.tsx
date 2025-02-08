import React from 'react';

interface HeroProps {
  onBookNow: () => void;
}

export default function Hero({ onBookNow }: HeroProps) {
  return (
    <section id="home" className="pt-16">
      <div className="relative h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Theater"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Experience Cinema Like Never Before</h1>
            <p className="text-xl mb-8">Book your private theater experience today</p>
            <div className="space-x-4">
              <button
                onClick={onBookNow}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700"
              >
                Book Now
              </button>
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-gray-100"
              >
                Know More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}