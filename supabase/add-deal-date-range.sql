-- Період дії акції (замість одного deal_date).
-- Виконайте в Supabase SQL Editor для існуючої таблиці stores.

ALTER TABLE stores ADD COLUMN IF NOT EXISTS deal_start_date DATE;
ALTER TABLE stores ADD COLUMN IF NOT EXISTS deal_end_date DATE;

-- Перенести старі дані з deal_date для сумісності
UPDATE stores
SET
  deal_start_date = deal_date,
  deal_end_date = deal_date
WHERE deal_date IS NOT NULL
  AND deal_start_date IS NULL
  AND deal_end_date IS NULL;
