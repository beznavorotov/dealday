-- Порядок відображення магазинів на головній сторінці.
-- Виконайте в Supabase SQL Editor для існуючої таблиці stores.

ALTER TABLE stores
  ADD COLUMN IF NOT EXISTS display_order INTEGER NOT NULL DEFAULT 0;
