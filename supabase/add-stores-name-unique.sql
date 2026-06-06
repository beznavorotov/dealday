-- Унікальна назва магазину: один запис на магазин, без дублів.
-- Виконайте в Supabase SQL Editor для існуючої таблиці stores.

ALTER TABLE stores
  ADD CONSTRAINT stores_name_unique UNIQUE (name);
