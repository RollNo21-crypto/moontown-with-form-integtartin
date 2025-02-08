-- Drop existing policies
DROP POLICY IF EXISTS "public_insert_policy" ON bookings;
DROP POLICY IF EXISTS "admin_select_policy" ON bookings;
DROP POLICY IF EXISTS "admin_update_policy" ON bookings;
DROP POLICY IF EXISTS "bookings_insert_public" ON bookings;
DROP POLICY IF EXISTS "bookings_select_admin" ON bookings;
DROP POLICY IF EXISTS "bookings_update_admin" ON bookings;

-- Disable and re-enable RLS
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create new simplified policies
-- Allow anyone to insert bookings
CREATE POLICY "allow_insert_bookings"
ON bookings FOR INSERT
TO public
WITH CHECK (true);

-- Allow admins to view all bookings
CREATE POLICY "allow_admin_view_bookings"
ON bookings FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
);

-- Allow admins to update bookings
CREATE POLICY "allow_admin_update_bookings"
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