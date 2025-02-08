import React from 'react';

interface ServicesProps {
  onBookNow: () => void;
}

export default function Services({ onBookNow }: ServicesProps) {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#4F46E5] to-purple-600 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience luxury and intimacy in our private theater spaces
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Birthday Celebration Card */}
          <article 
            className="group relative h-[350px] rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1464349153735-7db50ed83c84?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Gradient Overlay with Light Frost */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 opacity-60 transition-opacity duration-500 group-hover:opacity-70 backdrop-blur-[2px]" />
            
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="inline-block px-3 py-1 rounded-full bg-[#4F46E5]/90 backdrop-blur-sm text-white text-xs font-medium mb-2">
                  Private Experience
                </span>
                <h3 className="text-xl font-bold mb-2 text-white drop-shadow-lg">
                  Birthday Celebration
                </h3>
                <p className="text-white/90 text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2 backdrop-blur-[1px]">
                  Make your birthday extra special with our private theater experience. Perfect for intimate celebrations with friends and family.
                </p>
                <button
                  onClick={onBookNow}
                  className="w-full bg-[#4F46E5]/90 backdrop-blur-sm text-white py-2 px-4 rounded-lg
                           hover:bg-[#4F46E5] transition duration-300 font-medium text-sm
                           transform group-hover:scale-105 shadow-lg"
                >
                  Book Now
                </button>
              </div>
            </div>
          </article>

          {/* Bridal Celebration Card */}
          <article 
            className="group relative h-[350px] rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 opacity-60 transition-opacity duration-500 group-hover:opacity-70 backdrop-blur-[2px]" />
            
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="inline-block px-3 py-1 rounded-full bg-[#4F46E5]/90 backdrop-blur-sm text-white text-xs font-medium mb-2">
                  Luxury Setting
                </span>
                <h3 className="text-xl font-bold mb-2 text-white drop-shadow-lg">
                  Bridal Celebration
                </h3>
                <p className="text-white/90 text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2 backdrop-blur-[1px]">
                  Create unforgettable memories with a private bridal celebration. The perfect setting for your special moments.
                </p>
                <button
                  onClick={onBookNow}
                  className="w-full bg-[#4F46E5]/90 backdrop-blur-sm text-white py-2 px-4 rounded-lg
                           hover:bg-[#4F46E5] transition duration-300 font-medium text-sm
                           transform group-hover:scale-105 shadow-lg"
                >
                  Book Now
                </button>
              </div>
            </div>
          </article>

          {/* Anniversary Celebration Card */}
          <article 
            className="group relative h-[350px] rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 opacity-60 transition-opacity duration-500 group-hover:opacity-70 backdrop-blur-[2px]" />
            
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="inline-block px-3 py-1 rounded-full bg-[#4F46E5]/90 backdrop-blur-sm text-white text-xs font-medium mb-2">
                  Romantic Experience
                </span>
                <h3 className="text-xl font-bold mb-2 text-white drop-shadow-lg">
                  Anniversary Celebration
                </h3>
                <p className="text-white/90 text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2 backdrop-blur-[1px]">
                  Celebrate your special day in a unique and romantic setting. Perfect for couples looking for an intimate experience.
                </p>
                <button
                  onClick={onBookNow}
                  className="w-full bg-[#4F46E5]/90 backdrop-blur-sm text-white py-2 px-4 rounded-lg
                           hover:bg-[#4F46E5] transition duration-300 font-medium text-sm
                           transform group-hover:scale-105 shadow-lg"
                >
                  Book Now
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}