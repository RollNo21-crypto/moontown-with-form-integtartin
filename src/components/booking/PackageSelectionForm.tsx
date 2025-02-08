import React from 'react';
import { Users, Cake, Package, Camera } from 'lucide-react';
import type { BookingFormData } from '../../types/booking';

interface PackageSelectionFormProps {
  selectedPackage: string;
  needsPackage: string;
  cake: string;
  onPackageChange: (field: string, value: any) => void;
  onAdditionalOptionChange: (option: string, value: any) => void;
  additionalOptions: {
    decoration: boolean;
    fogEntry: string;
    photography: boolean;
  };
}

export default function PackageSelectionForm({
  selectedPackage,
  needsPackage,
  cake,
  onPackageChange,
  onAdditionalOptionChange,
  additionalOptions
}: PackageSelectionFormProps) {
  const selectClasses = "w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200";

  return (
    <div className="space-y-6">
      {/* Package Selection */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-indigo-600" />
            <span>Select Package</span>
          </div>
        </label>
        <select
          required
          className={selectClasses}
          value={selectedPackage}
          onChange={(e) => onPackageChange('package', e.target.value)}
        >
          <option value="">Select a package</option>
          <option value="Family Theatre - 1599">Family Theatre - ₹1599</option>
          <option value="Couples Theatre - 1111">Couples Theatre - ₹1111</option>
          <option value="Friends Theatre - 1599">Friends Theatre - ₹1599</option>
        </select>
      </div>

      {/* Cake Selection */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Cake className="w-4 h-4 text-indigo-600" />
            <span>Select Cake</span>
          </div>
        </label>
        <select
          required
          className={selectClasses}
          value={cake}
          onChange={(e) => onPackageChange('cake', e.target.value)}
        >
          <option value="">Select a cake</option>
          <option value="Chocolate Cake - 500">Chocolate Cake - ₹500</option>
          <option value="Black Forest Cake - 500">Black Forest Cake - ₹500</option>
          <option value="Butterscotch Cake - 500">Butterscotch Cake - ₹500</option>
          <option value="Pineapple Cake - 500">Pineapple Cake - ₹500</option>
          <option value="Red Velvet Round Cake - 600">Red Velvet Round Cake - ₹600</option>
          <option value="Irish Coffee Cake - 600">Irish Coffee Cake - ₹600</option>
          <option value="Red Velvet Heart Cake - 750">Red Velvet Heart Cake - ₹750</option>
          <option value="Choco Truffle Cake - 800">Choco Truffle Cake - ₹800</option>
          <option value="DBC Cake - 800">DBC Cake - ₹800</option>
          <option value="Choco Oreo Cake - 800">Choco Oreo Cake - ₹800</option>
          <option value="Choco Chip Loaded Cake - 800">Choco Chip Loaded Cake - ₹800</option>
          <option value="Kit Jar Cake - 1000">Kit Jar Cake - ₹1000</option>
        </select>
      </div>

      {/* Gold Package Selection */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-600" />
            <span>Do you want a Gold Package?</span>
          </div>
        </label>
        <select
          required
          className={selectClasses}
          value={needsPackage}
          onChange={(e) => onPackageChange('needs_package', e.target.value)}
        >
          <option value="">Select an option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {needsPackage === 'Yes' && (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Gold Package Details</h3>
          <p className="text-lg text-indigo-600 font-medium mb-4">
            {selectedPackage === 'Family Theatre - 1599' || selectedPackage === 'Friends Theatre - 1599'
              ? 'Gold Package Price: ₹2500'
              : 'Gold Package Price: ₹2000'}
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              3 Hour Theatre
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              Decoration
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              Photography & Videography (with edits)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              Fog Entry (4 pots)
            </li>
          </ul>
        </div>
      )}

      {needsPackage === 'No' && (
        <div className="space-y-6">
          {/* Decoration Option */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">Decoration (₹500)</label>
            <select
              required
              className={selectClasses}
              value={additionalOptions.decoration ? 'Yes' : 'No'}
              onChange={(e) => onAdditionalOptionChange('decoration', e.target.value === 'Yes')}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {/* Fog Entry Option */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">Fog Entry</label>
            <select
              required
              className={selectClasses}
              value={additionalOptions.fogEntry}
              onChange={(e) => onAdditionalOptionChange('fogEntry', e.target.value)}
            >
              <option value="">Select fog entry option</option>
              <option value="1 pot - 300">1 pot - ₹300</option>
              <option value="2 pots - 500">2 pots - ₹500</option>
              <option value="3 pots - 700">3 pots - ₹700</option>
              <option value="4 pots - 900">4 pots - ₹900</option>
              <option value="Grand Fog Entry (10 pots) - 1599">Grand Fog Entry (10 pots) - ₹1599</option>
            </select>
          </div>

          {/* Photography Option */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-indigo-600" />
                <span>Photography & Videography (₹699)</span>
              </div>
            </label>
            <select
              required
              className={selectClasses}
              value={additionalOptions.photography ? 'Yes' : 'No'}
              onChange={(e) => onAdditionalOptionChange('photography', e.target.value === 'Yes')}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
            <p className="text-sm text-gray-500 mt-2">
              Includes 30 minutes, 30 pictures, 15 candid shots & a 30-second Instagram reel (spot edit)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}