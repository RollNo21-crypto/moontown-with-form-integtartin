-- Create time_slots table
CREATE TABLE time_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_time text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "time_slots_select_policy"
ON time_slots FOR SELECT
TO public
USING (true);

CREATE POLICY "time_slots_admin_modify_policy"
ON time_slots FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
);

-- Insert default time slots
INSERT INTO time_slots (slot_time) VALUES
  ('10:00 AM'),
  ('1:00 PM'),
  ('4:00 PM'),
  ('7:00 PM'),
  ('10:00 PM');

-- Grant permissions
GRANT SELECT ON time_slots TO anon, authenticated;
GRANT ALL ON time_slots TO authenticated;