/*
  # Fix Booking Policies

  1. Changes
    - Add policy to allow public inserts into bookings table
    - Add policy for admin access to bookings
    - Enable RLS on bookings table
  
  2. Security
    - Public users can only insert new bookings
    - Admins have full access to all bookings
*/

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "bookings_insert_public" ON bookings;
DROP POLICY IF EXISTS "bookings_select_admin" ON bookings;
DROP POLICY IF EXISTS "bookings_update_admin" ON bookings;

-- Create policy for public inserts
CREATE POLICY "bookings_insert_public"
ON bookings FOR INSERT 
TO public
WITH CHECK (true);

-- Create policy for admin select
CREATE POLICY "bookings_select_admin"
ON bookings FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
);

-- Create policy for admin updates
CREATE POLICY "bookings_update_admin"
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