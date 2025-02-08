/*
  # Fix RLS Policies for Bookings Table

  1. Changes
    - Drop all existing policies
    - Create new simplified policies for public inserts and admin access
    - Grant proper permissions
  
  2. Security
    - Enable RLS
    - Ensure proper policy checks for admin access
*/

-- First, drop all existing policies to start fresh
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "bookings_insert_public" ON bookings;
  DROP POLICY IF EXISTS "bookings_select_admin" ON bookings;
  DROP POLICY IF EXISTS "bookings_update_admin" ON bookings;
  DROP POLICY IF EXISTS "allow_public_insert" ON bookings;
  DROP POLICY IF EXISTS "allow_admin_select" ON bookings;
  DROP POLICY IF EXISTS "allow_admin_update" ON bookings;
  DROP POLICY IF EXISTS "anon_insert_policy" ON bookings;
  DROP POLICY IF EXISTS "auth_insert_policy" ON bookings;
  DROP POLICY IF EXISTS "auth_select_policy" ON bookings;
  DROP POLICY IF EXISTS "auth_update_policy" ON bookings;
  DROP POLICY IF EXISTS "bookings_insert_policy" ON bookings;
  DROP POLICY IF EXISTS "bookings_select_policy" ON bookings;
  DROP POLICY IF EXISTS "bookings_update_policy" ON bookings;
  DROP POLICY IF EXISTS "allow_all_inserts" ON bookings;
END $$;

-- Disable and re-enable RLS to ensure clean state
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create new simplified policies
-- Allow public inserts (both anonymous and authenticated users)
CREATE POLICY "public_insert_policy"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow admin select
CREATE POLICY "admin_select_policy"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.email = auth.jwt() ->> 'email'
    )
  );

-- Allow admin update
CREATE POLICY "admin_update_policy"
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
GRANT INSERT ON bookings TO anon;
GRANT INSERT ON bookings TO authenticated;
GRANT SELECT, UPDATE ON bookings TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;