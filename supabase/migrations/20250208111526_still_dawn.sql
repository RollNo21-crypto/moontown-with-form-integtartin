-- Drop existing policies
DROP POLICY IF EXISTS "allow_insert_bookings" ON bookings;
DROP POLICY IF EXISTS "allow_admin_view_bookings" ON bookings;
DROP POLICY IF EXISTS "allow_admin_update_bookings" ON bookings;

-- Disable and re-enable RLS
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create new simplified policies
-- Allow anyone to insert bookings with no restrictions
CREATE POLICY "allow_public_bookings"
ON bookings FOR INSERT
TO public
WITH CHECK (true);

-- Allow admins to view all bookings
CREATE POLICY "allow_admin_select"
ON bookings FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
);

-- Allow admins to update bookings
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
GRANT ALL ON bookings TO authenticated;
GRANT INSERT ON bookings TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;