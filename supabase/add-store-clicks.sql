-- Статистика переходів по магазинах.
-- Виконайте в Supabase SQL Editor для існуючої таблиці stores.

ALTER TABLE stores
  ADD COLUMN IF NOT EXISTS clicks INTEGER NOT NULL DEFAULT 0;

CREATE OR REPLACE FUNCTION increment_store_clicks(store_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE stores SET clicks = clicks + 1 WHERE id = store_id;
END;
$$;

GRANT EXECUTE ON FUNCTION increment_store_clicks(UUID) TO anon, authenticated;
