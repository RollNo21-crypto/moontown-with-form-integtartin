import type { BookingFormData } from '../types/booking';

export const calculatePrice = (bookingData: BookingFormData): number => {
  let totalPrice = 0;

  // Base package price
  const packagePrices: Record<string, number> = {
    'Family Theatre - 1599': 1599,
    'Couples Theatre - 1111': 1111,
    'Friends Theatre - 1599': 1599
  };
  totalPrice += packagePrices[bookingData.package] || 0;

  // Cake price
  const cakePrices: Record<string, number> = {
    'Chocolate Cake - 500': 500,
    'Black Forest Cake - 500': 500,
    'Butterscotch Cake - 500': 500,
    'Pineapple Cake - 500': 500,
    'Red Velvet Round Cake - 600': 600,
    'Irish Coffee Cake - 600': 600,
    'Red Velvet Heart Cake - 750': 750,
    'Choco Truffle Cake - 800': 800,
    'DBC Cake - 800': 800,
    'Choco Oreo Cake - 800': 800,
    'Choco Chip Loaded Cake - 800': 800,
    'Kit Jar Cake - 1000': 1000
  };
  totalPrice += cakePrices[bookingData.cake] || 0;

  // Gold Package
  if (bookingData.needs_package === 'Yes') {
    totalPrice += (bookingData.package === 'Couples Theatre - 1111') ? 2000 : 2500;
  } else {
    // Individual add-ons
    if (bookingData.additional_options.decoration) totalPrice += 500;
    if (bookingData.additional_options.photography) totalPrice += 699;
    
    // Fog Entry
    const fogPrices: Record<string, number> = {
      '1 pot - 300': 300,
      '2 pots - 500': 500,
      '3 pots - 700': 700,
      '4 pots - 900': 900,
      'Grand Fog Entry (10 pots) - 1599': 1599
    };
    totalPrice += fogPrices[bookingData.additional_options.fogEntry] || 0;
  }

  return totalPrice;
};