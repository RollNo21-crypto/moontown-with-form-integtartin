import React from 'react';
import { BarChart2, TrendingUp, Users, Clock, Calendar, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';
import type { Analytics, BookingActivity } from '../../types/admin';

interface AnalyticsProps {
  analytics: Analytics;
  activities: BookingActivity[];
}

export default function Analytics({ analytics, activities }: AnalyticsProps) {
  // Calculate trends and insights
  const weeklyGrowth = ((analytics.weeklyRevenue - analytics.lastWeekRevenue) / analytics.lastWeekRevenue) * 100;
  const monthlyGrowth = ((analytics.monthlyRevenue - analytics.lastMonthRevenue) / analytics.lastMonthRevenue) * 100;
  
  // Calculate peak booking times
  const bookingTimes = activities.map(a => new Date(a.last_active).getHours());
  const peakHours = bookingTimes.reduce((acc, hour) => {
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);
  
  const sortedPeakHours = Object.entries(peakHours)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([hour, count]) => ({
      hour: parseInt(hour),
      count,
      percentage: (count / activities.length) * 100
    }));

  // Calculate user engagement metrics
  const completionRate = activities.length > 0
    ? (activities.filter(a => a.step_completed === 2).length / activities.length) * 100
    : 0;

  const dropoffRate = activities.length > 0
    ? (activities.filter(a => a.step_completed === 1).length / activities.length) * 100
    : 0;

  // Calculate conversion metrics
  const conversionTrend = analytics.lastMonthRevenue > 0
    ? ((analytics.monthlyRevenue - analytics.lastMonthRevenue) / analytics.lastMonthRevenue) * 100
    : 0;

  const averageBookingValue = analytics.totalBookings > 0
    ? analytics.totalRevenue / analytics.totalBookings
    : 0;

  return (
    <div className="space-y-8">
      {/* Revenue Metrics */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Revenue Analytics
          </h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-2xl font-bold">₹{analytics.totalRevenue.toLocaleString()}</p>
            <div className="flex items-center mt-2">
              {monthlyGrowth >= 0 ? (
                <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm ${monthlyGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(monthlyGrowth).toFixed(1)}% vs last month
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Monthly Revenue</p>
            <p className="text-2xl font-bold">₹{analytics.monthlyRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">Current month</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Average Booking Value</p>
            <p className="text-2xl font-bold">₹{averageBookingValue.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">Per booking</p>
          </div>
        </div>
      </div>

      {/* Conversion Metrics */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Conversion Analytics
          </h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500">Conversion Rate</p>
            <p className="text-2xl font-bold">{analytics.conversionRate.toFixed(1)}%</p>
            <div className="flex items-center mt-2">
              {conversionTrend >= 0 ? (
                <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm ${conversionTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(conversionTrend).toFixed(1)}% trend
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Form Completion Rate</p>
            <p className="text-2xl font-bold">{completionRate.toFixed(1)}%</p>
            <p className="text-sm text-gray-500 mt-2">Successfully completed</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Drop-off Rate</p>
            <p className="text-2xl font-bold">{dropoffRate.toFixed(1)}%</p>
            <p className="text-sm text-gray-500 mt-2">Left during booking</p>
          </div>
        </div>
      </div>

      {/* Peak Hours Analysis */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Peak Hours Analysis
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sortedPeakHours.map(({ hour, count, percentage }, index) => (
              <div key={hour} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    {hour.toString().padStart(2, '0')}:00 - {(hour + 1).toString().padStart(2, '0')}:00
                  </span>
                  <span className="text-sm font-medium text-indigo-600">
                    #{index + 1}
                  </span>
                </div>
                <p className="text-2xl font-bold">{count} bookings</p>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{percentage.toFixed(1)}% of total</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Status Distribution */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold flex items-center">
            <BarChart2 className="w-5 h-5 mr-2" />
            Booking Status Distribution
          </h2>
        </div>
        <div className="p-6">
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div className="flex h-full rounded-full overflow-hidden">
              <div
                className="bg-green-500 h-full"
                style={{
                  width: `${(analytics.confirmedBookings / analytics.totalBookings) * 100}%`
                }}
              ></div>
              <div
                className="bg-yellow-500 h-full"
                style={{
                  width: `${(analytics.pendingBookings / analytics.totalBookings) * 100}%`
                }}
              ></div>
              <div
                className="bg-red-500 h-full"
                style={{
                  width: `${(analytics.cancelledBookings / analytics.totalBookings) * 100}%`
                }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Confirmed</p>
              <p className="text-lg font-bold text-green-500">
                {((analytics.confirmedBookings / analytics.totalBookings) * 100).toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-lg font-bold text-yellow-500">
                {((analytics.pendingBookings / analytics.totalBookings) * 100).toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Cancelled</p>
              <p className="text-lg font-bold text-red-500">
                {((analytics.cancelledBookings / analytics.totalBookings) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}