import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-10 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center mb-16 animate-fade-in">
          About Us
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-right">
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our mission is to provide an unparalleled cinema experience in a
              private, luxurious setting that exceeds our customers' expectations.
              We strive to create an atmosphere where every movie night feels like
              a special occasion.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We envision redefining entertainment by offering personalized,
              high-quality cinematic experiences tailored to our customers' needs.
            </p>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
              Learn More About Us
            </button>
          </div>

          {/* Right Content - Main Video */}
          <div className="rounded-lg overflow-hidden shadow-md animate-slide-left">
            <img
              src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
              alt="Theater Experience"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* As Seen on Media Section */}
        <div className="mt-16">
          <h3 className="text-4xl font-extrabold text-center mb-16 animate-fade-in">
            As Seen on Media
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* First Media Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Premium Store"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="text-xl font-semibold mb-2">
                  Experience Our Premium Store
                </h4>
                <p className="text-gray-600">
                  Take a tour of our state-of-the-art facilities designed to deliver
                  the ultimate luxury and comfort. Witness the magic behind every
                  cinematic moment.
                </p>
              </div>
            </div>

            {/* Second Media Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1595769816263-9b910be24d5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Luxurious Setting"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="text-xl font-semibold mb-2">
                  Behind the Scenes of Our Luxurious Setting
                </h4>
                <p className="text-gray-600">
                  Discover how we bring a touch of elegance to every experience.
                  From meticulous planning to flawless execution, see what goes
                  into creating unforgettable moments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}