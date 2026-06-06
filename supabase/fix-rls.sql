-- Виконайте в Supabase SQL Editor, якщо публічне читання через anon key не працює

ALTER TABLE stores ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "stores_select_public" ON stores;
CREATE POLICY "stores_select_public"
  ON stores FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "stores_insert_auth" ON stores;
CREATE POLICY "stores_insert_auth"
  ON stores FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "stores_update_auth" ON stores;
CREATE POLICY "stores_update_auth"
  ON stores FOR UPDATE
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "stores_delete_auth" ON stores;
CREATE POLICY "stores_delete_auth"
  ON stores FOR DELETE
  TO authenticated
  USING (true);
