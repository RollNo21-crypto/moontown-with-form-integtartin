/*
  # Update Database Schema and Policies

  1. Updates
    - Drop existing policies to avoid conflicts
    - Update table structures if needed
    - Create new policies for proper access control
    - Ensure admin user exists

  2. Security
    - Enable RLS on all tables
    - Set up proper policies for:
      - Public booking creation
      - Admin access to bookings
      - Admin authentication
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Drop policies for bookings table
  DROP POLICY IF EXISTS "bookings_insert_public" ON bookings;
  DROP POLICY IF EXISTS "bookings_select_admin" ON bookings;
  DROP POLICY IF EXISTS "bookings_update_admin" ON bookings;
  DROP POLICY IF EXISTS "admin_read_bookings" ON bookings;
  DROP POLICY IF EXISTS "admin_update_bookings" ON bookings;
  DROP POLICY IF EXISTS "admin_delete_bookings" ON bookings;
  DROP POLICY IF EXISTS "booking_admin_access" ON bookings;
  DROP POLICY IF EXISTS "booking_public_insert" ON bookings;
  DROP POLICY IF EXISTS "booking_admin_select" ON bookings;
  DROP POLICY IF EXISTS "booking_admin_update" ON bookings;
  
  -- Drop policies for admins table
  DROP POLICY IF EXISTS "admins_select" ON admins;
  DROP POLICY IF EXISTS "admin_read" ON admins;
  DROP POLICY IF EXISTS "admin_access" ON admins;
  DROP POLICY IF EXISTS "admin_basic_access" ON admins;
END $$;

-- Ensure columns exist and have correct types
DO $$ 
BEGIN
  -- Add columns if they don't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'occasion_details') THEN
    ALTER TABLE bookings ADD COLUMN occasion_details jsonb DEFAULT '{}'::jsonb;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'needs_package') THEN
    ALTER TABLE bookings ADD COLUMN needs_package boolean DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'additional_options') THEN
    ALTER TABLE bookings ADD COLUMN additional_options jsonb DEFAULT '{}'::jsonb;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'status') THEN
    ALTER TABLE bookings ADD COLUMN status text DEFAULT 'pending';
  END IF;
END $$;

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Create new policies for bookings
CREATE POLICY "bookings_insert_public"
  ON bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "bookings_select_admin"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  ));

CREATE POLICY "bookings_update_admin"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  ));

-- Create new policy for admins
CREATE POLICY "admins_select"
  ON admins
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Ensure admin exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM admins WHERE email = 'admin@moontown.com') THEN
    INSERT INTO admins (email) VALUES ('admin@moontown.com');
  END IF;
END $$;