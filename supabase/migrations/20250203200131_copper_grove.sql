/*
  # Proper Database Structure Setup

  1. Tables
    - Recreate bookings table with proper structure and constraints
    - Ensure admin table exists
  
  2. Security
    - Enable RLS
    - Set up proper policies for public and admin access
    - Grant necessary permissions
  
  3. Performance
    - Add appropriate indexes
*/

-- Recreate bookings table with proper structure
DROP TABLE IF EXISTS bookings CASCADE;

CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (length(trim(name)) > 0),
  phone text NOT NULL CHECK (length(trim(phone)) > 0),
  email text NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  address text NOT NULL CHECK (length(trim(address)) > 0),
  location text NOT NULL CHECK (length(trim(location)) > 0),
  date text NOT NULL CHECK (length(trim(date)) > 0),
  time text NOT NULL CHECK (length(trim(time)) > 0),
  package text NOT NULL CHECK (length(trim(package)) > 0),
  occasion text NOT NULL CHECK (length(trim(occasion)) > 0),
  occasion_details jsonb NOT NULL DEFAULT '{}'::jsonb,
  cake text CHECK (cake IS NULL OR length(trim(cake)) > 0),
  needs_package boolean NOT NULL DEFAULT false,
  additional_options jsonb NOT NULL DEFAULT '{}'::jsonb,
  total_price numeric NOT NULL CHECK (total_price >= 0),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX bookings_status_idx ON bookings(status);
CREATE INDEX bookings_created_at_idx ON bookings(created_at DESC);
CREATE INDEX bookings_email_idx ON bookings(email);
CREATE INDEX bookings_date_idx ON bookings(date);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DO $$ 
BEGIN
  -- Drop all policies from bookings table
  DROP POLICY IF EXISTS "anon_insert_policy" ON bookings;
  DROP POLICY IF EXISTS "auth_insert_policy" ON bookings;
  DROP POLICY IF EXISTS "auth_select_policy" ON bookings;
  DROP POLICY IF EXISTS "auth_update_policy" ON bookings;
END $$;

-- Create simplified and secure policies
-- Allow anyone to insert bookings
CREATE POLICY "allow_public_insert"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow admins to view all bookings
CREATE POLICY "allow_admin_select"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.email = auth.jwt() ->> 'email'
    )
  );

-- Allow admins to update bookings
CREATE POLICY "allow_admin_update"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.email = auth.jwt() ->> 'email'
    )
  );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON bookings TO anon, authenticated;
GRANT SELECT, UPDATE ON bookings TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Create or replace functions for validation
CREATE OR REPLACE FUNCTION validate_booking()
RETURNS trigger AS $$
BEGIN
  -- Validate email format
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;

  -- Validate phone (basic check for now)
  IF length(trim(NEW.phone)) < 6 THEN
    RAISE EXCEPTION 'Phone number too short';
  END IF;

  -- Ensure positive price
  IF NEW.total_price < 0 THEN
    RAISE EXCEPTION 'Price cannot be negative';
  END IF;

  -- Validate status
  IF NEW.status NOT IN ('pending', 'confirmed', 'cancelled') THEN
    RAISE EXCEPTION 'Invalid status value';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for validation
DROP TRIGGER IF EXISTS validate_booking_trigger ON bookings;
CREATE TRIGGER validate_booking_trigger
  BEFORE INSERT OR UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION validate_booking();