/*
  # Initial Database Schema Setup

  1. Tables
    - bookings: Store all booking information
    - admins: Store admin user information

  2. Security
    - Enable RLS on all tables
    - Set up policies for:
      - Public booking creation
      - Admin access to bookings
      - Admin authentication

  3. Data
    - Default admin user creation
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS admins CASCADE;

-- Create bookings table
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Create admins table
CREATE TABLE admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Policies for bookings table
-- Allow anyone to create bookings
CREATE POLICY "bookings_insert_public"
  ON bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow admins to read bookings
CREATE POLICY "bookings_select_admin"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  ));

-- Allow admins to update bookings
CREATE POLICY "bookings_update_admin"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  ));

-- Policies for admins table
-- Allow admins to read their own record
CREATE POLICY "admins_select"
  ON admins
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Insert default admin
INSERT INTO admins (email)
VALUES ('admin@moontown.com')
ON CONFLICT (email) DO NOTHING;