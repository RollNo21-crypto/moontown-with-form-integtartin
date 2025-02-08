/*
  # Add User Details to Bookings Table

  1. Changes
    - Add user details columns to bookings table:
      - name
      - phone
      - email
      - address
*/

-- Add new columns to bookings table
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS name text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS phone text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS email text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS address text NOT NULL DEFAULT '';

-- Remove default values for new columns
ALTER TABLE bookings
  ALTER COLUMN name DROP DEFAULT,
  ALTER COLUMN phone DROP DEFAULT,
  ALTER COLUMN email DROP DEFAULT,
  ALTER COLUMN address DROP DEFAULT;