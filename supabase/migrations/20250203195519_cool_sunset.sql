/*
  # Final Fix for Booking Table and RLS Policies

  1. Changes
    - Drop and recreate table to ensure clean state
    - Set up proper RLS policies with correct permissions
    - Add proper indexes for performance
  
  2. Security
    - Allow public inserts without authentication
    - Admin access for select/update operations
*/

-- Drop and recreate the table to ensure clean state
DROP TABLE IF EXISTS bookings CASCADE;

CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  address text NOT NULL,
  location text NOT NULL,
  date text NOT NULL,
  time text NOT NULL,
  package text NOT NULL,
  occasion text NOT NULL,
  occasion_details jsonb DEFAULT '{}'::jsonb,
  cake text,
  needs_package boolean DEFAULT false,
  additional_options jsonb DEFAULT '{}'::jsonb,
  total_price numeric NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policy for public inserts (no auth required)
CREATE POLICY "bookings_insert_policy"
ON bookings FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Create policy for admin select
CREATE POLICY "bookings_select_policy"
ON bookings FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
);

-- Create policy for admin updates
CREATE POLICY "bookings_update_policy"
ON bookings FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings(status);
CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON bookings(created_at);

-- Grant necessary permissions
GRANT ALL ON bookings TO authenticated;
GRANT INSERT ON bookings TO anon;

-- Ensure sequence permissions if using serial columns
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;