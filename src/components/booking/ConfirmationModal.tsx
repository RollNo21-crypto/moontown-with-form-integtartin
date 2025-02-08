import React from 'react';
import { Check, Copy, X, Download, Share } from 'lucide-react';
import type { BookingFormData } from '../../types/booking';
import html2canvas from 'html2canvas';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: BookingFormData;
  bookingId: string;
  totalPrice: number;
}

export default function ConfirmationModal({ 
  isOpen, 
  onClose, 
  bookingData, 
  bookingId,
  totalPrice 
}: ConfirmationModalProps) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopyReference = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    try {
      const element = document.getElementById('confirmation-content');
      if (!element) return;

      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = `booking-${bookingId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Error downloading confirmation:', err);
    }
  };

  const handleShareToWhatsApp = () => {
    const adminWhatsApp = '919606993278'; // Admin's WhatsApp number
    const message = `
🎫 New Booking Alert!

Booking ID: ${bookingId}
Customer: ${bookingData.name}
Phone: ${bookingData.phone}
Email: ${bookingData.email}
Location: ${bookingData.location}
Date: ${bookingData.date}
Time: ${bookingData.time}
Package: ${bookingData.package}
Occasion: ${bookingData.occasion}
Cake: ${bookingData.cake}
Gold Package: ${bookingData.needs_package}

${!bookingData.needs_package ? `Additional Options:
${bookingData.additional_options.decoration ? '- Decoration' : ''}
${bookingData.additional_options.fogEntry ? `- ${bookingData.additional_options.fogEntry}` : ''}
${bookingData.additional_options.photography ? '- Photography & Videography' : ''}` : ''}

Total Price: ₹${totalPrice.toLocaleString()}
    `.trim();

    const whatsappUrl = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div id="confirmation-content" className="bg-white p-6">
          <div className="text-center mb-6">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h2>
            <p className="text-gray-600 mt-2">Your theater has been successfully booked</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-700">Booking Reference:</span>
              <div className="flex items-center gap-2">
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">{bookingId}</code>
                <button
                  onClick={handleCopyReference}
                  className="text-gray-500 hover:text-gray-700"
                  title="Copy reference number"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{bookingData.name}</span>

                <span className="text-gray-600">Phone:</span>
                <span className="font-medium">{bookingData.phone}</span>

                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{bookingData.email}</span>

                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{bookingData.date}</span>

                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{bookingData.time}</span>

                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{bookingData.location}</span>

                <span className="text-gray-600">Package:</span>
                <span className="font-medium">{bookingData.package}</span>

                <span className="text-gray-600">Occasion:</span>
                <span className="font-medium">{bookingData.occasion}</span>

                <span className="text-gray-600">Cake:</span>
                <span className="font-medium">{bookingData.cake}</span>

                <span className="text-gray-600">Gold Package:</span>
                <span className="font-medium">{bookingData.needs_package}</span>

                {!bookingData.needs_package && (
                  <>
                    <span className="text-gray-600">Additional Options:</span>
                    <div className="font-medium">
                      {bookingData.additional_options.decoration && <div>Decoration</div>}
                      {bookingData.additional_options.fogEntry && <div>{bookingData.additional_options.fogEntry}</div>}
                      {bookingData.additional_options.photography && <div>Photography</div>}
                    </div>
                  </>
                )}

                <span className="text-gray-600">Total Amount:</span>
                <span className="font-medium">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 mb-6">
            <p>A confirmation email has been sent to {bookingData.email}</p>
            <p className="mt-1">Please save your booking reference for future use</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
            <button
              onClick={handleShareToWhatsApp}
              className="flex-1 flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
            >
              <Share className="w-4 h-4 mr-2" />
              Share to Admin
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}