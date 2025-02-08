import React from 'react';
import { Check } from 'lucide-react';

interface PricingDetailsProps {
  onBookNow: () => void;
}

const PricingDetails = ({ onBookNow }: PricingDetailsProps) => {
  const packages = [
    {
      name: 'Family Theater',
      price: '₹1599',
      description: 'Perfect for family celebrations',
      features: ['8-10 people', '3 Hours Duration', 'Premium Sound System', 'Comfortable Seating', 'Private Ambiance'],
      image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c'
    },
    {
      name: 'Group Theater',
      price: '₹1599',
      description: 'Ideal for friend gatherings',
      features: ['6-8 people', '3 Hours Duration', 'Premium Sound System', 'Comfortable Seating', 'Private Ambiance'],
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba'
    },
    {
      name: 'Couple Theater',
      price: '₹1111',
      description: 'Romantic setting for couples',
      features: ['2 people', '3 Hours Duration', 'Premium Sound System', 'Couple Seating', 'Private Ambiance'],
      image: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f'
    }
  ];

  const fogEntries = [
    { name: '1 Pot Fog Entry', price: '₹300' },
    { name: '2 Pots Fog Entry', price: '₹500' },
    { name: '3 Pots Fog Entry', price: '₹700' },
    { name: '4 Pots Fog Entry', price: '₹900'},
    { name: 'Grand Fog Entry (10 Pots)', price: '₹1599' }
  ];

  const decorations = [
    { name: 'Basic Decoration', price: '₹500', description: 'Enhance your celebration', image: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f' },
    { name: 'Candle Path', price: '₹300', description: 'Enhance your celebration', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1' },
    { name: 'LED Number', price: '₹100', description: 'Enhance your celebration', image: 'https://images.unsplash.com/photo-1586899028174-e7098604235b' }
  ];

  const gifts = [
    { name: 'Small Heart Pillow', price: '₹200', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c' },
    { name: 'Event Sash', price: '₹100', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba' },
    { name: 'Crown', price: '₹150', image: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f' },
    { name: 'Bouquet 7 Roses', price: '₹350', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1' },
    { name: 'Bouquet 10 Roses', price: '₹450', image: 'https://images.unsplash.com/photo-1585647347384-2593bc35786b' },
    { name: 'Luxury Bouquet 10 Roses', price: '₹500', image: 'https://images.unsplash.com/photo-1586899028174-e7098604235b' }
  ];

  const cakes = [
    { name: 'Chocolate Cake', price: '₹500', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba' },
    { name: 'Black Forest Cake', price: '₹500', image: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f' },
    { name: 'Butterscotch Cake', price: '₹500', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1' },
    { name: 'Pineapple Cake', price: '₹500', image: 'https://images.unsplash.com/photo-1585647347384-2593bc35786b' },
    { name: 'Red Velvet Round Cake', price: '₹600', image: 'https://images.unsplash.com/photo-1586899028174-e7098604235b' },
    { name: 'Irish Coffee Cake', price: '₹600', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c' },
    { name: 'Red Velvet Heart Cake', price: '₹750', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba' },
    { name: 'Choco Truffle Cake', price: '₹800', image: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f' },
    { name: 'Oreo Cake', price: '₹800', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1' },
    { name: 'Choco Chip Loaded Cake', price: '₹800', image: 'https://images.unsplash.com/photo-1585647347384-2593bc35786b' },
    { name: 'Kit Jar Cake', price: '₹1000', image: 'https://images.unsplash.com/photo-1586899028174-e7098604235b' }
  ];

  const photography = {
    name: 'Photography & Videography',
    price: '₹699',
    description: '30 min - 30 pictures, 15 candid pics & 30 sec Instagram reels with spot edit',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1'
  };

  return (
    <div className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-800 animate-fade-in">
            Choose Your Perfect Package
          </h2>
          <p className="text-gray-600 animate-slide-in">
            Enjoy a premium private cinema experience with add-ons
          </p>
        </div>

        {/* Main Packages */}
        <div className="grid md:grid-cols-3 gap-10">
          {packages.map((pkg) => (
            <div key={pkg.name} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover" />
              <div className="p-8">
                <h3 className="text-2xl font-bold text-center mb-2">{pkg.name}</h3>
                <p className="text-center text-gray-500 mb-4">{pkg.description}</p>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-indigo-600">{pkg.price}</span>
                </div>
                <ul className="space-y-4 mb-6">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onBookNow}
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 
                           transition duration-300 transform hover:scale-105 font-medium"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Fog Entries */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-4">Fog Entry Options</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {fogEntries.map((fog) => (
              <div key={fog.name} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
                <h4 className="font-semibold mb-2">{fog.name}</h4>
                <p className="text-indigo-600 font-bold">{fog.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Photography & Videography */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-4">Photography & Videography</h3>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
            <img src={photography.image} alt={photography.name} className="w-full h-32 object-cover mb-4" />
            <h4 className="font-semibold mb-2">{photography.name}</h4>
            <p className="text-gray-600 mb-2">{photography.description}</p>
            <p className="text-indigo-600 font-bold">{photography.price}</p>
          </div>
        </div>

        {/* Decorations */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-4">Decorations</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {decorations.map((decoration) => (
              <div key={decoration.name} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
                <img src={decoration.image} alt={decoration.name} className="w-full h-32 object-cover mb-4" />
                <h4 className="font-semibold mb-2">{decoration.name}</h4>
                <p className="text-gray-600 mb-2">{decoration.description}</p>
                <p className="text-indigo-600 font-bold">{decoration.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gifts */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-4">Gifts</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {gifts.map((gift) => (
              <div key={gift.name} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
                <img src={gift.image} alt={gift.name} className="w-full h-32 object-cover mb-4" />
                <h4 className="font-semibold mb-2">{gift.name}</h4>
                <p className="text-indigo-600 font-bold">{gift.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cakes */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-4">Cakes</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {cakes.map((cake) => (
              <div key={cake.name} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
                <img src={cake.image} alt={cake.name} className="w-full h-32 object-cover mb-4" />
                <h4 className="font-semibold mb-2">{cake.name}</h4>
                <p className="text-indigo-600 font-bold">{cake.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingDetails;