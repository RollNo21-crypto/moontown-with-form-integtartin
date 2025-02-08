import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import PersonalDetailsForm from './booking/PersonalDetailsForm';
import OccasionDetailsForm from './booking/OccasionDetailsForm';
import PackageSelectionForm from './booking/PackageSelectionForm';
import BookingSummary from './booking/BookingSummary';
import ConfirmationModal from './booking/ConfirmationModal';
import { calculatePrice } from '../utils/pricing';
import type { BookingFormData } from '../types/booking';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialBookingData: BookingFormData = {
  name: '',
  phone: '',
  email: '',
  address: 'N/A',
  location: '',
  date: '',
  time: '',
  package: '',
  occasion: '',
  occasion_details: {},
  cake: '',
  needs_package: '',
  additional_options: {
    decoration: false,
    fogEntry: '',
    photography: false
  }
};

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [bookingData, setBookingData] = useState<BookingFormData>(initialBookingData);
  const [totalPrice, setTotalPrice] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [activityId, setActivityId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setBookingData(initialBookingData);
      setCurrentStep(1);
      setError('');
      setShowConfirmation(false);
      setBookingId('');
      setActivityId(null);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    setTotalPrice(calculatePrice(bookingData));
  }, [bookingData]);

  const trackActivity = async (step: number) => {
    try {
      if (!bookingData.name || !bookingData.email || !bookingData.phone) {
        return;
      }

      const activityData = {
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        step_completed: step,
        last_active: new Date().toISOString()
      };

      if (activityId) {
        const { error } = await supabase
          .from('booking_activities')
          .update(activityData)
          .eq('id', activityId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('booking_activities')
          .insert([activityData])
          .select()
          .single();

        if (error) throw error;
        if (data) setActivityId(data.id);
      }
    } catch (err) {
      console.error('Error tracking activity:', err);
    }
  };

  const handlePersonalDetailsUpdate = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleOccasionChange = (occasion: string) => {
    setBookingData(prev => ({ ...prev, occasion, occasion_details: {} }));
    setError('');
  };

  const handleOccasionDetailsChange = (field: string, value: string) => {
    setBookingData(prev => {
      if (field === 'location' || field === 'date' || field === 'time') {
        return { ...prev, [field]: value };
      }
      return {
        ...prev,
        occasion_details: { ...prev.occasion_details, [field]: value }
      };
    });
    setError('');
  };

  const handlePackageChange = (field: string, value: any) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleAdditionalOptionsChange = (option: string, value: any) => {
    setBookingData(prev => ({
      ...prev,
      additional_options: { ...prev.additional_options, [option]: value }
    }));
    setError('');
  };

  const validatePersonalDetails = () => {
    if (!bookingData.name || !bookingData.phone || !bookingData.email) {
      setError('Please fill in all personal details');
      return false;
    }
    return true;
  };

  const validateBookingDetails = () => {
    if (!bookingData.location || !bookingData.date || !bookingData.time || 
        !bookingData.package || !bookingData.occasion || !bookingData.cake || 
        !bookingData.needs_package) {
      setError('Please fill in all booking details');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (currentStep === 1) {
      if (validatePersonalDetails()) {
        await trackActivity(1);
        setCurrentStep(2);
      }
      return;
    }

    if (!validateBookingDetails()) {
      return;
    }

    setSubmitting(true);
    
    try {
      await trackActivity(2);

      const bookingPayload = {
        name: bookingData.name,
        phone: bookingData.phone,
        email: bookingData.email,
        address: bookingData.address,
        location: bookingData.location,
        date: bookingData.date,
        time: bookingData.time,
        package: bookingData.package,
        occasion: bookingData.occasion,
        occasion_details: bookingData.occasion_details,
        cake: bookingData.cake,
        needs_package: bookingData.needs_package === 'Yes',
        additional_options: bookingData.additional_options,
        total_price: calculatePrice(bookingData),
        status: 'pending'
      };

      // Insert the booking
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .insert([bookingPayload])
        .select()
        .single();

      if (bookingError) {
        throw new Error(bookingError.message);
      }

      if (!bookingData?.id) {
        throw new Error('Failed to create booking');
      }

      setBookingId(bookingData.id);
      setShowConfirmation(true);

      // Clean up activity tracking
      if (activityId) {
        await supabase
          .from('booking_activities')
          .delete()
          .eq('id', activityId);
      }
    } catch (err: any) {
      console.error('Booking error:', err);
      setError(err.message || 'Failed to save booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setBookingData(initialBookingData);
    setCurrentStep(1);
    setError('');
    setShowConfirmation(false);
    setBookingId('');
    setActivityId(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
        <div className="min-h-screen px-4 text-center">
          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
          
          <div className="inline-block w-full max-w-md text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <div className="relative">
              {/* Header */}
              <div className="sticky top-0 bg-white px-6 py-4 border-b z-10 rounded-t-2xl">
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900">Book Your Private Theater</h2>
              </div>

              {/* Content */}
              <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {currentStep === 1 ? (
                    <>
                      <PersonalDetailsForm
                        bookingData={bookingData}
                        onUpdate={handlePersonalDetailsUpdate}
                      />
                    </>
                  ) : (
                    <>
                      <OccasionDetailsForm
                        occasion={bookingData.occasion}
                        onOccasionChange={handleOccasionChange}
                        onDetailsChange={handleOccasionDetailsChange}
                      />
                      
                      <PackageSelectionForm
                        selectedPackage={bookingData.package}
                        needsPackage={bookingData.needs_package}
                        onPackageChange={handlePackageChange}
                        onAdditionalOptionChange={handleAdditionalOptionsChange}
                        additionalOptions={bookingData.additional_options}
                        cake={bookingData.cake}
                      />

                      <BookingSummary
                        bookingData={bookingData}
                        totalPrice={totalPrice}
                      />
                    </>
                  )}
                </form>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white px-6 py-4 border-t">
                {currentStep === 1 ? (
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-200 font-medium"
                  >
                    Continue to Booking Details
                  </button>
                ) : (
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 bg-gray-100 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-200 transition duration-200 font-medium"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-xl hover:bg-indigo-700 transition duration-200 font-medium disabled:opacity-50"
                    >
                      {submitting ? 'Confirming...' : 'Confirm Booking'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleClose}
        bookingData={bookingData}
        bookingId={bookingId}
        totalPrice={totalPrice}
      />
    </>
  );
}