import React from 'react';
import { Search, Filter, Eye, Download, User, Phone, Mail, Home, MapPin, Calendar, Clock, Package, FileSpreadsheet } from 'lucide-react';
import type { Booking } from '../../types/admin';
import * as XLSX from 'xlsx';

interface BookingsTableProps {
  bookings: Booking[];
  search: string;
  setSearch: (search: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  updateBookingStatus: (id: string, status: string) => void;
  onViewDetails: (booking: Booking) => void;
  onDownloadConfirmation: (booking: Booking) => void;
  getStatusIcon: (status: string) => JSX.Element;
}

export default function BookingsTable({
  bookings,
  search,
  setSearch,
  filter,
  setFilter,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  updateBookingStatus,
  onViewDetails,
  onDownloadConfirmation,
  getStatusIcon
}: BookingsTableProps) {
  const filteredBookings = bookings
    .filter(booking => filter === 'all' || booking.status === filter)
    .filter(booking => 
      search === '' ||
      booking.name.toLowerCase().includes(search.toLowerCase()) ||
      booking.email.toLowerCase().includes(search.toLowerCase()) ||
      booking.phone.toLowerCase().includes(search.toLowerCase()) ||
      booking.location.toLowerCase().includes(search.toLowerCase()) ||
      booking.occasion.toLowerCase().includes(search.toLowerCase())
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const exportToExcel = () => {
    // Prepare data for export
    const exportData = filteredBookings.map(booking => ({
      'Booking ID': booking.id,
      'Status': booking.status,
      'Created At': new Date(booking.created_at).toLocaleString(),
      'Name': booking.name,
      'Phone': booking.phone,
      'Email': booking.email,
      'Address': booking.address,
      'Location': booking.location,
      'Date': booking.date,
      'Time': booking.time,
      'Package': booking.package,
      'Occasion': booking.occasion,
      'Cake': booking.cake,
      'Gold Package': booking.needs_package ? 'Yes' : 'No',
      'Total Price': `₹${booking.total_price}`,
      'Additional Options': JSON.stringify(booking.additional_options),
      'Occasion Details': JSON.stringify(booking.occasion_details)
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bookings');

    // Generate Excel file
    XLSX.writeFile(wb, `bookings_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Bookings</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Export to Excel
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference & Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package & Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">
                        #{booking.id.slice(0, 8)}
                      </div>
                      <div className="flex items-center mt-1">
                        {getStatusIcon(booking.status)}
                        <span className="ml-2 text-sm text-gray-500">
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(booking.created_at).toLocaleString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm font-medium text-gray-900">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        {booking.name}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {booking.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {booking.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Home className="w-4 h-4 mr-2 text-gray-400" />
                        {booking.address}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {booking.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {booking.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        {booking.time}
                      </div>
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Occasion:</span> {booking.occasion}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <Package className="w-4 h-4 mr-2 text-gray-400" />
                        {booking.package}
                      </div>
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Cake:</span> {booking.cake}
                      </div>
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Gold Package:</span> {booking.needs_package ? 'Yes' : 'No'}
                      </div>
                      <div className="text-sm font-medium text-indigo-600">
                        ₹{booking.total_price.toLocaleString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 space-y-2">
                    <select
                      value={booking.status}
                      onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                      className="w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mb-2"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirm</option>
                      <option value="cancelled">Cancel</option>
                    </select>
                    <button
                      onClick={() => onViewDetails(booking)}
                      className="w-full flex items-center justify-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 mb-2"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </button>
                    <button
                      onClick={() => onDownloadConfirmation(booking)}
                      className="w-full flex items-center justify-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
          <div className="flex items-center">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(indexOfLastItem, filteredBookings.length)}
              </span>{' '}
              of <span className="font-medium">{filteredBookings.length}</span> results
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === page ? 'bg-indigo-600 text-white' : 'hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}