import React from 'react';
import { AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';

const RefundPolicy = () => {
  return (
    <div className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-800 animate-slide-in">
            Refund Policy
          </h2>
          <p className="text-gray-600 animate-fade-in">
            We want you to be completely satisfied with your booking
          </p>
        </div>

        {/* Cancellation Timeline & Special Circumstances */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Cancellation Timeline */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-indigo-600 mr-2 animate-fade-in" />
              <h3 className="text-xl font-semibold">Cancellation Timeline</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start animate-slide-in">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1" />
                <div>
                  <p className="font-semibold">More than 48 hours before</p>
                  <p className="text-gray-600">Full refund minus processing fees</p>
                </div>
              </li>
              <li className="flex items-start animate-slide-in">
                <AlertCircle className="w-5 h-5 text-yellow-500 mr-2 mt-1" />
                <div>
                  <p className="font-semibold">24-48 hours before</p>
                  <p className="text-gray-600">75% refund of the total amount</p>
                </div>
              </li>
              <li className="flex items-start animate-slide-in">
                <XCircle className="w-5 h-5 text-red-500 mr-2 mt-1" />
                <div>
                  <p className="font-semibold">Less than 24 hours</p>
                  <p className="text-gray-600">No refund available</p>
                </div> </li>
            </ul>
          </div>

          {/* Special Circumstances */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-indigo-600 mr-2 animate-fade-in" />
              <h3 className="text-xl font-semibold">Special Circumstances</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start animate-slide-in">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1" />
                <div>
                  <p className="font-semibold">Technical Issues</p>
                  <p className="text-gray-600">
                    Full refund or complimentary rebooking if the cancellation is due to technical problems on our end
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* How to Request a Refund */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105">
          <h3 className="text-xl font-semibold mb-4 animate-fade-in">
            How to Request a Refund
          </h3>
          <div className="space-y-4">
            <p className="text-gray-600">
              To request a refund, please contact our customer support:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Call us at: +91 8217516064</li>
              <li>Email: support@moontown.com</li>
              <li>WhatsApp: +91 8217516064</li>
            </ul>
            <p className="text-gray-600">
              Our team will process your request within 2-3 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;