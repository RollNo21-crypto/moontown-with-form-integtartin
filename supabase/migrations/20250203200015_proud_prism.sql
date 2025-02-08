-- First, drop all existing policies
DROP POLICY IF EXISTS "allow_all_inserts" ON bookings;
DROP POLICY IF EXISTS "allow_admin_select" ON bookings;
DROP POLICY IF EXISTS "allow_admin_update" ON bookings;
DROP POLICY IF EXISTS "bookings_insert_policy" ON bookings;
DROP POLICY IF EXISTS "bookings_select_policy" ON bookings;
DROP POLICY IF EXISTS "bookings_update_policy" ON bookings;

-- Recreate the bookings table with proper structure
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

-- Disable RLS temporarily
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;

-- Grant base permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Grant specific table permissions
GRANT ALL ON bookings TO authenticated;
GRANT INSERT ON bookings TO anon;
GRANT INSERT ON bookings TO authenticated;

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create simplified policies
CREATE POLICY "anon_insert_policy" ON bookings
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "auth_insert_policy" ON bookings
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "auth_select_policy" ON bookings
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  ));

CREATE POLICY "auth_update_policy" ON bookings
  FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  ));

-- Ensure sequence permissions
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;