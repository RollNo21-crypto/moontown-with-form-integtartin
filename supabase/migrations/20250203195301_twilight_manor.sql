/*
  # Fix Booking Table and Policies

  1. Changes
    - Ensure bookings table has all required columns
    - Drop and recreate RLS policies with correct permissions
    - Add proper indexes for performance
  
  2. Security
    - Allow public inserts without authentication
    - Admin access for select/update operations
*/

-- First ensure the table exists with all required columns
CREATE TABLE IF NOT EXISTS bookings (
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

-- Drop all existing policies
DROP POLICY IF EXISTS "bookings_insert_public" ON bookings;
DROP POLICY IF EXISTS "bookings_select_admin" ON bookings;
DROP POLICY IF EXISTS "bookings_update_admin" ON bookings;

-- Disable and re-enable RLS to ensure clean state
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policy for public inserts (no auth required)
CREATE POLICY "allow_public_inserts"
ON bookings FOR INSERT
TO public
WITH CHECK (true);

-- Create policy for admin select
CREATE POLICY "allow_admin_select"
ON bookings FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
);

-- Create policy for admin updates
CREATE POLICY "allow_admin_updates"
ON bookings FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings(status);
CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON bookings(created_at);

-- Grant necessary permissions
GRANT INSERT ON bookings TO public;
GRANT SELECT, UPDATE ON bookings TO authenticated;