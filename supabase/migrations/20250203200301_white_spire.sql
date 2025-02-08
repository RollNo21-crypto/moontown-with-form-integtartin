/*
  # Fix Database Structure

  1. Tables
    - Add missing constraints and validations
    - Ensure proper data types and checks
  
  2. Security
    - Reinforce RLS policies
    - Add additional validation triggers
*/

-- Function to check if a constraint exists
CREATE OR REPLACE FUNCTION check_constraint_exists(p_table text, p_constraint text)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM information_schema.constraint_column_usage
    WHERE table_name = p_table
    AND constraint_name = p_constraint
  );
END;
$$ LANGUAGE plpgsql;

-- Add check constraints if they don't exist
DO $$ 
BEGIN
  -- Add check constraints only if they don't exist
  IF NOT check_constraint_exists('bookings', 'bookings_name_check') THEN
    ALTER TABLE bookings ADD CONSTRAINT bookings_name_check 
      CHECK (length(trim(name)) > 0);
  END IF;

  IF NOT check_constraint_exists('bookings', 'bookings_phone_check') THEN
    ALTER TABLE bookings ADD CONSTRAINT bookings_phone_check 
      CHECK (length(trim(phone)) > 0);
  END IF;

  IF NOT check_constraint_exists('bookings', 'bookings_email_check') THEN
    ALTER TABLE bookings ADD CONSTRAINT bookings_email_check 
      CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
  END IF;

  IF NOT check_constraint_exists('bookings', 'bookings_address_check') THEN
    ALTER TABLE bookings ADD CONSTRAINT bookings_address_check 
      CHECK (length(trim(address)) > 0);
  END IF;

  IF NOT check_constraint_exists('bookings', 'bookings_location_check') THEN
    ALTER TABLE bookings ADD CONSTRAINT bookings_location_check 
      CHECK (length(trim(location)) > 0);
  END IF;

  IF NOT check_constraint_exists('bookings', 'bookings_date_check') THEN
    ALTER TABLE bookings ADD CONSTRAINT bookings_date_check 
      CHECK (length(trim(date)) > 0);
  END IF;

  IF NOT check_constraint_exists('bookings', 'bookings_time_check') THEN
    ALTER TABLE bookings ADD CONSTRAINT bookings_time_check 
      CHECK (length(trim(time)) > 0);
  END IF;

  IF NOT check_constraint_exists('bookings', 'bookings_package_check') THEN
    ALTER TABLE bookings ADD CONSTRAINT bookings_package_check 
      CHECK (length(trim(package)) > 0);
  END IF;

  IF NOT check_constraint_exists('bookings', 'bookings_occasion_check') THEN
    ALTER TABLE bookings ADD CONSTRAINT bookings_occasion_check 
      CHECK (length(trim(occasion)) > 0);
  END IF;

  IF NOT check_constraint_exists('bookings', 'bookings_total_price_check') THEN
    ALTER TABLE bookings ADD CONSTRAINT bookings_total_price_check 
      CHECK (total_price >= 0);
  END IF;

  IF NOT check_constraint_exists('bookings', 'bookings_status_check') THEN
    ALTER TABLE bookings ADD CONSTRAINT bookings_status_check 
      CHECK (status IN ('pending', 'confirmed', 'cancelled'));
  END IF;
END $$;

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings(status);
CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS bookings_email_idx ON bookings(email);
CREATE INDEX IF NOT EXISTS bookings_date_idx ON bookings(date);

-- Create validation function
CREATE OR REPLACE FUNCTION validate_booking()
RETURNS trigger AS $$
BEGIN
  -- Validate email format
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;

  -- Validate phone
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

-- Create trigger for validation if it doesn't exist
DROP TRIGGER IF EXISTS validate_booking_trigger ON bookings;
CREATE TRIGGER validate_booking_trigger
  BEFORE INSERT OR UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION validate_booking();

-- Ensure RLS is enabled
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Recreate policies with better names
DO $$ 
BEGIN
  -- Drop existing policies
  DROP POLICY IF EXISTS "allow_public_insert" ON bookings;
  DROP POLICY IF EXISTS "allow_admin_select" ON bookings;
  DROP POLICY IF EXISTS "allow_admin_update" ON bookings;
END $$;

-- Create new policies
CREATE POLICY "bookings_public_insert"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "bookings_admin_select"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  ));

CREATE POLICY "bookings_admin_update"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  ));

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON bookings TO anon, authenticated;
GRANT SELECT, UPDATE ON bookings TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;