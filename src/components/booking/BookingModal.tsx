import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import PersonalDetailsForm from './PersonalDetailsForm';
import OccasionDetailsForm from './OccasionDetailsForm';
import PackageSelectionForm from './PackageSelectionForm';
import BookingSummary from './BookingSummary';
import ConfirmationModal from './ConfirmationModal';
import { calculatePrice } from '../../../utils/pricing';
import type { BookingFormData } from '../../../types/booking';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialBookingData: BookingFormData = {
  name: '',
  phone: '',
  email: '',
  address: '',
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

  useEffect(() => {
    setTotalPrice(calculatePrice(bookingData));
  }, [bookingData]);

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
    if (!bookingData.name || !bookingData.phone || !bookingData.email || !bookingData.address) {
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
        setCurrentStep(2);
      }
      return;
    }

    if (!validateBookingDetails()) {
      return;
    }

    setSubmitting(true);
    
    try {
      const bookingPayload = {
        ...bookingData,
        needs_package: bookingData.needs_package === 'Yes',
        total_price: calculatePrice(bookingData),
        status: 'pending'
      };

      const { data, error: saveError } = await supabase
        .from('bookings')
        .insert([bookingPayload])
        .select('id')
        .single();

      if (saveError) throw saveError;

      setBookingId(data.id);
      setShowConfirmation(true);
    } catch (err: any) {
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
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6 relative overflow-y-auto max-h-[90vh]">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold mb-6">Book Your Private Theater</h2>

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
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
                >
                  Continue to Booking Details
                </button>
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

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
                  >
                    {submitting ? 'Confirming...' : 'Confirm Booking'}
                  </button>
                </div>
              </>
            )}
          </form>
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