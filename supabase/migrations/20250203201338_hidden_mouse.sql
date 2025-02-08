/*
  # Update Booking Activities Table

  1. Updates
    - Add any missing columns if needed
    - Update policies for better security
    - Add missing indexes
*/

-- Update existing table structure if needed
DO $$ 
BEGIN
  -- Add columns if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'booking_activities' AND column_name = 'step_completed'
  ) THEN
    ALTER TABLE booking_activities ADD COLUMN step_completed integer NOT NULL DEFAULT 1;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'booking_activities' AND column_name = 'last_active'
  ) THEN
    ALTER TABLE booking_activities ADD COLUMN last_active timestamptz NOT NULL DEFAULT now();
  END IF;
END $$;

-- Ensure RLS is enabled
ALTER TABLE booking_activities ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "public_insert_policy" ON booking_activities;
  DROP POLICY IF EXISTS "admin_select_policy" ON booking_activities;
END $$;

-- Create or update policies
CREATE POLICY "public_insert_policy"
  ON booking_activities
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "admin_select_policy"
  ON booking_activities
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.email = auth.jwt() ->> 'email'
    )
  );

-- Create or update indexes
CREATE INDEX IF NOT EXISTS booking_activities_last_active_idx 
  ON booking_activities(last_active DESC);
CREATE INDEX IF NOT EXISTS booking_activities_email_idx 
  ON booking_activities(email);

-- Update permissions
GRANT INSERT ON booking_activities TO anon, authenticated;
GRANT SELECT ON booking_activities TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;