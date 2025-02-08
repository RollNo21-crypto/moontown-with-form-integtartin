import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import type { Analytics, Booking, BookingActivity } from '../types/admin';
import Header from '../components/admin/Header';
import Sidebar from '../components/admin/Sidebar';
import DashboardOverview from '../components/admin/DashboardOverview';
import BookingsTable from '../components/admin/BookingsTable';
import ActivityTable from '../components/admin/ActivityTable';
import Analytics from '../components/admin/Analytics';
import TimeSlotManager from '../components/admin/TimeSlotManager';
import BookingDetailsModal from '../components/admin/BookingDetailsModal';
import html2canvas from 'html2canvas';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activities, setActivities] = useState<BookingActivity[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    weeklyRevenue: 0,
    lastWeekRevenue: 0,
    lastMonthRevenue: 0,
    conversionRate: 0,
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
    totalVisitors: 0,
    newBookings: 0
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/admin/login');
        return;
      }

      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('email', session.user.email)
        .single();

      if (adminError || !adminData) {
        await supabase.auth.signOut();
        navigate('/admin/login');
        return;
      }

      fetchData();
    } catch (err) {
      console.error('Auth check error:', err);
      navigate('/admin/login');
    }
  };

  const fetchData = async () => {
    try {
      setRefreshing(true);

      // Fetch bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (bookingsError) throw bookingsError;
      setBookings(bookingsData || []);

      // Fetch activities
      const { data: activitiesData, error: activitiesError } = await supabase
        .from('booking_activities')
        .select('*')
        .order('last_active', { ascending: false });

      if (activitiesError) throw activitiesError;
      setActivities(activitiesData || []);

      // Calculate analytics
      if (bookingsData) {
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

        const totalRevenue = bookingsData.reduce((sum, booking) => sum + booking.total_price, 0);
        const monthlyRevenue = bookingsData
          .filter(booking => new Date(booking.created_at) > oneMonthAgo)
          .reduce((sum, booking) => sum + booking.total_price, 0);
        const weeklyRevenue = bookingsData
          .filter(booking => new Date(booking.created_at) > oneWeekAgo)
          .reduce((sum, booking) => sum + booking.total_price, 0);
        const lastMonthRevenue = bookingsData
          .filter(booking => {
            const date = new Date(booking.created_at);
            return date <= oneMonthAgo && date > twoMonthsAgo;
          })
          .reduce((sum, booking) => sum + booking.total_price, 0);

        setAnalytics({
          totalRevenue,
          monthlyRevenue,
          weeklyRevenue,
          lastWeekRevenue: weeklyRevenue * 0.9, // Simulated for demo
          lastMonthRevenue,
          conversionRate: (bookingsData.length / (activitiesData?.length || 1)) * 100,
          totalBookings: bookingsData.length,
          pendingBookings: bookingsData.filter(b => b.status === 'pending').length,
          confirmedBookings: bookingsData.filter(b => b.status === 'confirmed').length,
          cancelledBookings: bookingsData.filter(b => b.status === 'cancelled').length,
          totalVisitors: activitiesData?.length || 0,
          newBookings: bookingsData.filter(b => new Date(b.created_at) > oneWeekAgo).length
        });
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/admin/login');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      console.error('Error updating booking:', err);
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const handleDownloadConfirmation = async (booking: Booking) => {
    try {
      const element = document.createElement('div');
      element.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <h2>Booking Confirmation</h2>
          <p><strong>Booking ID:</strong> ${booking.id}</p>
          <p><strong>Name:</strong> ${booking.name}</p>
          <p><strong>Email:</strong> ${booking.email}</p>
          <p><strong>Phone:</strong> ${booking.phone}</p>
          <p><strong>Location:</strong> ${booking.location}</p>
          <p><strong>Date:</strong> ${booking.date}</p>
          <p><strong>Time:</strong> ${booking.time}</p>
          <p><strong>Package:</strong> ${booking.package}</p>
          <p><strong>Total Price:</strong> ₹${booking.total_price}</p>
          <p><strong>Status:</strong> ${booking.status}</p>
        </div>
      `;
      document.body.appendChild(element);
      
      const canvas = await html2canvas(element);
      document.body.removeChild(element);
      
      const link = document.createElement('a');
      link.download = `booking-${booking.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Error downloading confirmation:', err);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onRefresh={fetchData}
        refreshing={refreshing}
      />
      
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        onLogout={handleLogout}
      />

      <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <DashboardOverview
                analytics={analytics}
                activities={activities}
              />
              <TimeSlotManager />
            </div>
          )}

          {activeTab === 'bookings' && (
            <BookingsTable
              bookings={bookings}
              search={search}
              setSearch={setSearch}
              filter={filter}
              setFilter={setFilter}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              updateBookingStatus={updateBookingStatus}
              onViewDetails={handleViewDetails}
              onDownloadConfirmation={handleDownloadConfirmation}
              getStatusIcon={getStatusIcon}
            />
          )}

          {activeTab === 'activities' && (
            <ActivityTable
              activities={activities}
              search={search}
              setSearch={setSearch}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
            />
          )}

          {activeTab === 'analytics' && (
            <Analytics
              analytics={analytics}
              activities={activities}
            />
          )}
        </div>
      </main>

      <BookingDetailsModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
}