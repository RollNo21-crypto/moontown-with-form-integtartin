import React, { useState } from 'react';
import { X, User, Phone, Mail, MapPin, Calendar, Clock, Package, Gift, Cake, Save } from 'lucide-react';
import type { Booking } from '../../types/admin';
import { supabase } from '../../lib/supabase';

interface BookingDetailsModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export default function BookingDetailsModal({ booking, onClose }: BookingDetailsModalProps) {
  const [editingTime, setEditingTime] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  if (!booking) return null;

  const timeSlots = [
    "10:00 AM",
    "1:00 PM",
    "4:00 PM",
    "7:00 PM",
    "10:00 PM"
  ];

  const handleTimeUpdate = async () => {
    if (!selectedTime) {
      setError('Please select a time slot');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const { error: updateError } = await supabase
        .from('bookings')
        .update({ time: selectedTime })
        .eq('id', booking.id);

      if (updateError) throw updateError;

      setEditingTime(false);
      // Refresh the page to show updated data
      window.location.reload();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Booking Details</h2>

        <div className="space-y-6">
          {/* Reference & Status */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Reference</h3>
            <p className="text-gray-700">#{booking.id}</p>
            <p className={`mt-2 ${
              booking.status === 'confirmed' ? 'text-green-600' :
              booking.status === 'cancelled' ? 'text-red-600' :
              'text-yellow-600'
            }`}>
              Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Created: {new Date(booking.created_at).toLocaleString()}
            </p>
          </div>

          {/* Customer Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-4">Customer Details</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-2" />
                <span>{booking.name}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 mr-2" />
                <span>{booking.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                <span>{booking.email}</span>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-4">Booking Details</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                <span>Location: {booking.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                <span>Date: {booking.date}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-2" />
                  <span>Time: {booking.time}</span>
                </div>
                <button
                  onClick={() => setEditingTime(true)}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  Edit Time
                </button>
              </div>
              {editingTime && (
                <div className="mt-2 space-y-3">
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select new time slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={handleTimeUpdate}
                      disabled={saving}
                      className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {saving ? 'Saving...' : 'Save Time'}
                    </button>
                    <button
                      onClick={() => {
                        setEditingTime(false);
                        setError('');
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              <div className="flex items-center">
                <Package className="w-5 h-5 text-gray-400 mr-2" />
                <span>Package: {booking.package}</span>
              </div>
              <div className="flex items-center">
                <Gift className="w-5 h-5 text-gray-400 mr-2" />
                <span>Occasion: {booking.occasion}</span>
              </div>
              <div className="flex items-center">
                <Cake className="w-5 h-5 text-gray-400 mr-2" />
                <span>Cake: {booking.cake}</span>
              </div>
            </div>
          </div>

          {/* Occasion Details */}
          {Object.keys(booking.occasion_details).length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-4">Occasion Details</h3>
              <div className="space-y-2">
                {Object.entries(booking.occasion_details).map(([key, value]) => (
                  <div key={key}>
                    <span className="font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                    <span>{value as string}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Package Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-4">Package Details</h3>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Gold Package: </span>
                {booking.needs_package ? 'Yes' : 'No'}
              </p>
              {!booking.needs_package && booking.additional_options && (
                <div className="mt-2">
                  <p className="font-medium">Additional Options:</p>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    {booking.additional_options.decoration && (
                      <li>Decoration</li>
                    )}
                    {booking.additional_options.fogEntry && (
                      <li>{booking.additional_options.fogEntry}</li>
                    )}
                    {booking.additional_options.photography && (
                      <li>Photography & Videography</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Price Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Price Details</h3>
            <p className="text-2xl font-bold text-indigo-600">
              ₹{booking.total_price.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}