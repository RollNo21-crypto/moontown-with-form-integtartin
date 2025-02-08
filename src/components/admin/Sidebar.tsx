import React from 'react';
import { BarChart2, Calendar, TrendingUp, Activity } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  onLogout: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, onLogout }: SidebarProps) {
  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } transition-transform duration-300 ease-in-out`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-indigo-600">TheaterBook Admin</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
              activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
            }`}
          >
            <BarChart2 className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
              activeTab === 'bookings' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Bookings</span>
          </button>

          <button
            onClick={() => setActiveTab('activities')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
              activeTab === 'activities' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span>Recent Activity</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
              activeTab === 'analytics' ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span>Analytics</span>
          </button>
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}