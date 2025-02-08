/*
  # Create booking activities table
  
  1. New Tables
    - `booking_activities`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, not null)
      - `phone` (text, not null)
      - `step_completed` (integer, default 1)
      - `last_active` (timestamptz, default now())
  
  2. Security
    - Enable RLS
    - Add policies for public insert and admin select
    - Add indexes for performance
*/

-- Drop existing table and policies if they exist
DROP TABLE IF EXISTS booking_activities CASCADE;

-- Create booking activities table
CREATE TABLE booking_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  step_completed integer NOT NULL DEFAULT 1,
  last_active timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE booking_activities ENABLE ROW LEVEL SECURITY;

-- Create policies with unique names
CREATE POLICY "booking_activities_insert_policy"
  ON booking_activities
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "booking_activities_admin_select_policy"
  ON booking_activities
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE admins.email = auth.jwt() ->> 'email'
    )
  );

-- Create indexes
CREATE INDEX booking_activities_last_active_idx ON booking_activities(last_active DESC);
CREATE INDEX booking_activities_email_idx ON booking_activities(email);

-- Grant permissions
GRANT INSERT ON booking_activities TO anon, authenticated;
GRANT SELECT ON booking_activities TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;