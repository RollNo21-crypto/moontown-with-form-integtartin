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

-- Add constraints safely
DO $$ 
BEGIN
  -- Add NOT NULL constraints
  ALTER TABLE bookings
    ALTER COLUMN name SET NOT NULL,
    ALTER COLUMN phone SET NOT NULL,
    ALTER COLUMN email SET NOT NULL,
    ALTER COLUMN address SET NOT NULL,
    ALTER COLUMN location SET NOT NULL,
    ALTER COLUMN date SET NOT NULL,
    ALTER COLUMN time SET NOT NULL,
    ALTER COLUMN package SET NOT NULL,
    ALTER COLUMN occasion SET NOT NULL,
    ALTER COLUMN total_price SET NOT NULL,
    ALTER COLUMN status SET DEFAULT 'pending',
    ALTER COLUMN created_at SET DEFAULT now();

  -- Add check constraints only if they don't exist
  IF NOT check_constraint_exists('bookings', 'bookings_email_format_check') THEN
    ALTER TABLE bookings ADD CONSTRAINT bookings_email_format_check 
      CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
  END IF;

  IF NOT check_constraint_exists('bookings', 'bookings_phone_length_check') THEN
    ALTER TABLE bookings ADD CONSTRAINT bookings_phone_length_check 
      CHECK (length(trim(phone)) >= 6);
  END IF;

  IF NOT check_constraint_exists('bookings', 'bookings_price_check') THEN
    ALTER TABLE bookings ADD CONSTRAINT bookings_price_check 
      CHECK (total_price >= 0);
  END IF;

  IF NOT check_constraint_exists('bookings', 'bookings_status_values_check') THEN
    ALTER TABLE bookings ADD CONSTRAINT bookings_status_values_check 
      CHECK (status IN ('pending', 'confirmed', 'cancelled'));
  END IF;
END $$;

-- Create or replace indexes
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

-- Create trigger for validation
DROP TRIGGER IF EXISTS validate_booking_trigger ON bookings;
CREATE TRIGGER validate_booking_trigger
  BEFORE INSERT OR UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION validate_booking();

-- Ensure RLS is enabled
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON bookings TO anon, authenticated;
GRANT SELECT, UPDATE ON bookings TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;