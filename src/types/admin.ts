export interface Analytics {
  totalRevenue: number;
  monthlyRevenue: number;
  weeklyRevenue: number;
  lastWeekRevenue: number;
  lastMonthRevenue: number;
  conversionRate: number;
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalVisitors: number;
  newBookings: number;
}

export interface BookingActivity {
  id: string;
  name: string;
  email: string;
  phone: string;
  step_completed: number;
  last_active: string;
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  location: string;
  date: string;
  time: string;
  package: string;
  occasion: string;
  occasion_details: Record<string, any>;
  cake: string;
  needs_package: boolean;
  additional_options: Record<string, any>;
  total_price: number;
  status: string;
  created_at: string;
}