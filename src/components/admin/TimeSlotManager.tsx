import React, { useState, useEffect } from 'react';
import { Plus, Save, X, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface TimeSlot {
  id: string;
  slot_time: string;
  is_active: boolean;
}

export default function TimeSlotManager() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [newSlot, setNewSlot] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  const fetchTimeSlots = async () => {
    try {
      const { data, error } = await supabase
        .from('time_slots')
        .select('*')
        .order('slot_time');

      if (error) throw error;
      setTimeSlots(data || []);
    } catch (err: any) {
      console.error('Error fetching time slots:', err);
      setError(err.message);
    }
  };

  const handleAddSlot = async () => {
    if (!newSlot) {
      setError('Please enter a time slot');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase
        .from('time_slots')
        .insert([{ slot_time: newSlot }]);

      if (error) throw error;

      setNewSlot('');
      await fetchTimeSlots();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase
        .from('time_slots')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      await fetchTimeSlots();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSlot = async (id: string) => {
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase
        .from('time_slots')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchTimeSlots();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Manage Time Slots</h2>
        <div className="flex items-center gap-2">
          <input
            type="time"
            value={newSlot}
            onChange={(e) => {
              const time = new Date(`2000-01-01T${e.target.value}`);
              setNewSlot(time.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              }));
            }}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleAddSlot}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Slot
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {timeSlots.map((slot) => (
          <div
            key={slot.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-gray-400 mr-2" />
              <span className={slot.is_active ? 'text-gray-900' : 'text-gray-500'}>
                {slot.slot_time}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleActive(slot.id, slot.is_active)}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  slot.is_active
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {slot.is_active ? 'Active' : 'Inactive'}
              </button>
              <button
                onClick={() => handleDeleteSlot(slot.id)}
                className="p-1 text-red-600 hover:text-red-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}