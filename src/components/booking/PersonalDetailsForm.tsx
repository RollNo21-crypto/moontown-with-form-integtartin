import React, { useState } from 'react';
import { User, Phone, Mail } from 'lucide-react';
import type { BookingFormData } from '../../types/booking';

interface PersonalDetailsFormProps {
  bookingData: BookingFormData;
  onUpdate: (field: string, value: string) => void;
}

export default function PersonalDetailsForm({ bookingData, onUpdate }: PersonalDetailsFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 3) return 'Name must be at least 3 characters';
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'Name can only contain letters and spaces';
        return '';

      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^[6-9]\d{9}$/.test(value.trim())) return 'Please enter a valid 10-digit mobile number';
        return '';

      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.trim())) return 'Please enter a valid email address';
        return '';

      default:
        return '';
    }
  };

  const handleChange = (field: string, value: string) => {
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
    onUpdate(field, value);
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200";
  const errorClasses = "mt-1 text-sm text-red-600";

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-600" />
            <span>Full Name</span>
          </div>
        </label>
        <input
          type="text"
          required
          className={`${inputClasses} ${errors.name ? 'border-red-500' : ''}`}
          value={bookingData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter your full name"
        />
        {errors.name && <p className={errorClasses}>{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-indigo-600" />
            <span>Phone Number (WhatsApp)</span>
          </div>
        </label>
        <input
          type="tel"
          required
          className={`${inputClasses} ${errors.phone ? 'border-red-500' : ''}`}
          value={bookingData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="Enter your 10-digit mobile number"
          maxLength={10}
        />
        {errors.phone && <p className={errorClasses}>{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-indigo-600" />
            <span>Email Address</span>
          </div>
        </label>
        <input
          type="email"
          required
          className={`${inputClasses} ${errors.email ? 'border-red-500' : ''}`}
          value={bookingData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="Enter your email address"
        />
        {errors.email && <p className={errorClasses}>{errors.email}</p>}
      </div>
    </div>
  );
}