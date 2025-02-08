import React from 'react';
import { DollarSign, Calendar, TrendingUp, Package, AlertCircle, CheckCircle, XCircle, User, ArrowUp, ArrowDown, Activity } from 'lucide-react';
import type { Analytics, BookingActivity } from '../../types/admin';

interface DashboardOverviewProps {
  analytics: Analytics;
  activities: BookingActivity[];
}

export default function DashboardOverview({ analytics, activities }: DashboardOverviewProps) {
  // Calculate insights
  const weeklyGrowth = ((analytics.weeklyRevenue - analytics.lastWeekRevenue) / analytics.lastWeekRevenue) * 100;
  const monthlyGrowth = ((analytics.monthlyRevenue - analytics.lastMonthRevenue) / analytics.lastMonthRevenue) * 100;
  
  // Calculate peak booking times
  const bookingTimes = activities.map(a => new Date(a.last_active).getHours());
  const peakHour = bookingTimes.length > 0 
    ? bookingTimes.reduce((acc, curr) => 
        bookingTimes.filter(h => h === curr).length > bookingTimes.filter(h => h === acc).length ? curr : acc
      )
    : null;

  // Calculate user engagement
  const completionRate = activities.length > 0
    ? (activities.filter(a => a.step_completed === 2).length / activities.length) * 100
    : 0;

  // Calculate conversion trends
  const conversionTrend = analytics.lastMonthRevenue > 0
    ? ((analytics.monthlyRevenue - analytics.lastMonthRevenue) / analytics.lastMonthRevenue) * 100
    : 0;

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Existing revenue card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
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
            <DollarSign className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        {/* Conversion Insights */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
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
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        {/* User Engagement */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completion Rate</p>
              <p className="text-2xl font-bold">{completionRate.toFixed(1)}%</p>
              <p className="text-sm text-gray-500 mt-2">
                Form completion rate
              </p>
            </div>
            <Activity className="w-8 h-8 text-green-600" />
          </div>
        </div>

        {/* Peak Hours */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Peak Booking Time</p>
              <p className="text-2xl font-bold">
                {peakHour !== null ? `${peakHour}:00` : 'N/A'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Most active hour
              </p>
            </div>
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Booking Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Bookings</p>
              <p className="text-2xl font-bold text-yellow-500">{analytics.pendingBookings}</p>
              <p className="text-sm text-gray-500 mt-2">
                Requires attention
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Confirmed Bookings</p>
              <p className="text-2xl font-bold text-green-500">{analytics.confirmedBookings}</p>
              <p className="text-sm text-gray-500 mt-2">
                {((analytics.confirmedBookings / analytics.totalBookings) * 100).toFixed(1)}% success rate
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Cancelled Bookings</p>
              <p className="text-2xl font-bold text-red-500">{analytics.cancelledBookings}</p>
              <p className="text-sm text-gray-500 mt-2">
                {((analytics.cancelledBookings / analytics.totalBookings) * 100).toFixed(1)}% cancellation rate
              </p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Activities</h2>
        </div>
        <div className="p-6">
          {activities.length > 0 ? (
            activities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.name}</p>
                    <p className="text-sm text-gray-500">{activity.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {new Date(activity.last_active).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Step {activity.step_completed}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">No recent activities</p>
          )}
        </div>
      </div>
    </div>
  );
}