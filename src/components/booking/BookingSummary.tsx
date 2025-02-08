import React from 'react';
import type { BookingFormData } from '../../types/booking';

interface BookingSummaryProps {
  bookingData: BookingFormData;
  totalPrice: number;
}

export default function BookingSummary({ bookingData, totalPrice }: BookingSummaryProps) {
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Booking Summary</h3>
      <div className="space-y-2 text-sm">
        <div className="grid grid-cols-2 gap-2">
          <span className="font-medium">Name:</span>
          <span>{bookingData.name}</span>

          <span className="font-medium">Phone:</span>
          <span>{bookingData.phone}</span>

          <span className="font-medium">Email:</span>
          <span>{bookingData.email}</span>

          <span className="font-medium">Location:</span>
          <span>{bookingData.location || 'Not selected'}</span>

          <span className="font-medium">Date:</span>
          <span>{bookingData.date || 'Not selected'}</span>

          <span className="font-medium">Time:</span>
          <span>{bookingData.time || 'Not selected'}</span>

          <span className="font-medium">Package:</span>
          <span>{bookingData.package || 'Not selected'}</span>

          <span className="font-medium">Occasion:</span>
          <span>{bookingData.occasion || 'Not selected'}</span>

          {bookingData.cake && (
            <>
              <span className="font-medium">Cake:</span>
              <span>{bookingData.cake}</span>
            </>
          )}

          {bookingData.needs_package === 'Yes' ? (
            <>
              <span className="font-medium">Gold Package:</span>
              <span>Yes</span>
            </>
          ) : (
            <>
              {bookingData.additional_options.decoration && (
                <>
                  <span className="font-medium">Decoration:</span>
                  <span>Yes (₹500)</span>
                </>
              )}
              {bookingData.additional_options.fogEntry && (
                <>
                  <span className="font-medium">Fog Entry:</span>
                  <span>{bookingData.additional_options.fogEntry}</span>
                </>
              )}
              {bookingData.additional_options.photography && (
                <>
                  <span className="font-medium">Photography:</span>
                  <span>Yes (₹699)</span>
                </>
              )}
            </>
          )}
        </div>

        <div className="border-t pt-2 mt-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total Price:</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}