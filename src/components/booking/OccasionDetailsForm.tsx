import React, { useState, useEffect } from 'react';
import { Gift, MapPin, Calendar, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface TimeSlot {
  id: string;
  slot_time: string;
  is_active: boolean;
}

interface OccasionDetailsFormProps {
  occasion: string;
  onOccasionChange: (occasion: string) => void;
  onDetailsChange: (field: string, value: string) => void;
}

export default function OccasionDetailsForm({
  occasion,
  onOccasionChange,
  onDetailsChange
}: OccasionDetailsFormProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  const fetchTimeSlots = async () => {
    try {
      const { data, error } = await supabase
        .from('time_slots')
        .select('*')
        .eq('is_active', true)
        .order('slot_time');

      if (error) throw error;
      setTimeSlots(data || []);
    } catch (err) {
      console.error('Error fetching time slots:', err);
    }
  };

  const renderOccasionFields = () => {
    const inputClasses = "w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200";

    switch (occasion) {
      case 'Birthday':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name of Birthday Person"
              required
              className={inputClasses}
              onChange={(e) => onDetailsChange('birthdayPerson', e.target.value)}
            />
            <input
              type="number"
              placeholder="Age"
              required
              className={inputClasses}
              onChange={(e) => onDetailsChange('age', e.target.value)}
            />
          </div>
        );

      case 'Anniversary':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              className={inputClasses}
              onChange={(e) => onDetailsChange('yourName', e.target.value)}
            />
            <input
              type="text"
              placeholder="Partner's Name"
              required
              className={inputClasses}
              onChange={(e) => onDetailsChange('partnerName', e.target.value)}
            />
            <input
              type="number"
              placeholder="Years Together"
              required
              className={inputClasses}
              onChange={(e) => onDetailsChange('yearsTogether', e.target.value)}
            />
          </div>
        );

      case 'Marriage Proposal':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              className={inputClasses}
              onChange={(e) => onDetailsChange('yourName', e.target.value)}
            />
            <input
              type="text"
              placeholder="Partner's Name"
              required
              className={inputClasses}
              onChange={(e) => onDetailsChange('partnerName', e.target.value)}
            />
            <textarea
              placeholder="Special Message"
              className={inputClasses}
              rows={3}
              onChange={(e) => onDetailsChange('specialMessage', e.target.value)}
            />
          </div>
        );

      case 'Romantic Date':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              className={inputClasses}
              onChange={(e) => onDetailsChange('yourName', e.target.value)}
            />
            <input
              type="text"
              placeholder="Partner's Name"
              required
              className={inputClasses}
              onChange={(e) => onDetailsChange('partnerName', e.target.value)}
            />
          </div>
        );

      case 'Bride to Be':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name of the Bride"
              required
              className={inputClasses}
              onChange={(e) => onDetailsChange('brideName', e.target.value)}
            />
            <textarea
              placeholder="Special Message"
              className={inputClasses}
              rows={3}
              onChange={(e) => onDetailsChange('specialMessage', e.target.value)}
            />
          </div>
        );

      case 'Groom to Be':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name of the Groom"
              required
              className={inputClasses}
              onChange={(e) => onDetailsChange('groomName', e.target.value)}
            />
            <textarea
              placeholder="Special Message"
              className={inputClasses}
              rows={3}
              onChange={(e) => onDetailsChange('specialMessage', e.target.value)}
            />
          </div>
        );

      case 'Farewell':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name of the Person"
              required
              className={inputClasses}
              onChange={(e) => onDetailsChange('farewellPerson', e.target.value)}
            />
            <textarea
              placeholder="Special Message"
              className={inputClasses}
              rows={3}
              onChange={(e) => onDetailsChange('specialMessage', e.target.value)}
            />
          </div>
        );

      case 'Victory Celebration':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name of the Person/Team"
              required
              className={inputClasses}
              onChange={(e) => onDetailsChange('victoryPersonTeam', e.target.value)}
            />
            <textarea
              placeholder="Special Message"
              className={inputClasses}
              rows={3}
              onChange={(e) => onDetailsChange('specialMessage', e.target.value)}
            />
          </div>
        );

      case 'Baby Shower':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name of the Mother"
              required
              className={inputClasses}
              onChange={(e) => onDetailsChange('motherName', e.target.value)}
            />
            <textarea
              placeholder="Special Message"
              className={inputClasses}
              rows={3}
              onChange={(e) => onDetailsChange('specialMessage', e.target.value)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const selectClasses = "w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200";

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-600" />
            <span>Select Location</span>
          </div>
        </label>
        <select
          required
          className={selectClasses}
          onChange={(e) => onDetailsChange('location', e.target.value)}
        >
          <option value="">Select a location</option>
          <option value="RR Nagar">RR Nagar</option>
          <option value="Coming Soon">Coming Soon</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span>Select Date</span>
          </div>
        </label>
        <input
          type="date"
          required
          className={selectClasses}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => onDetailsChange('date', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>Select Time</span>
          </div>
        </label>
        <select
          required
          className={selectClasses}
          onChange={(e) => onDetailsChange('time', e.target.value)}
        >
          <option value="">Select a time slot</option>
          {timeSlots.map((slot) => (
            <option key={slot.id} value={slot.slot_time}>
              {slot.slot_time}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-indigo-600" />
            <span>Select Occasion</span>
          </div>
        </label>
        <select
          required
          className={selectClasses}
          value={occasion}
          onChange={(e) => onOccasionChange(e.target.value)}
        >
          <option value="">Select an occasion</option>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Romantic Date">Romantic Date</option>
          <option value="Marriage Proposal">Marriage Proposal</option>
          <option value="Bride to Be">Bride to Be</option>
          <option value="Groom to Be">Groom to Be</option>
          <option value="Farewell">Farewell</option>
          <option value="Victory Celebration">Victory Celebration</option>
          <option value="Baby Shower">Baby Shower</option>
        </select>
      </div>

      {occasion && (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Enter {occasion} Details</h3>
          {renderOccasionFields()}
        </div>
      )}
    </div>
  );
}