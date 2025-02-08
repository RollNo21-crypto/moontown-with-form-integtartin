import React from 'react';
import { ChevronLeft, RefreshCw } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onRefresh: () => void;
  refreshing: boolean;
}

export default function Header({ sidebarOpen, setSidebarOpen, onRefresh, refreshing }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <ChevronLeft className={`w-5 h-5 transform transition-transform ${
            sidebarOpen ? '' : 'rotate-180'
          }`} />
        </button>
        <div className="flex items-center space-x-4">
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
            title="Refresh data"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="text-sm">Refresh</span>
          </button>
        </div>
      </div>
    </header>
  );
}