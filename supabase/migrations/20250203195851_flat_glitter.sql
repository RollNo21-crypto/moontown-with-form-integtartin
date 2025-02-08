-- Drop existing policies
DROP POLICY IF EXISTS "bookings_insert_policy" ON bookings;
DROP POLICY IF EXISTS "bookings_select_policy" ON bookings;
DROP POLICY IF EXISTS "bookings_update_policy" ON bookings;

-- Disable and re-enable RLS to ensure clean state
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create a simple insert policy for public access
CREATE POLICY "allow_all_inserts"
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
CREATE POLICY "allow_admin_update"
ON bookings FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
);

-- Grant necessary permissions
GRANT INSERT ON bookings TO anon;
GRANT INSERT ON bookings TO authenticated;
GRANT SELECT, UPDATE ON bookings TO authenticated;