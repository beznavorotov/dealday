-- Логотип магазину (необов'язкове поле).
-- Виконайте в Supabase SQL Editor для існуючої таблиці stores.

ALTER TABLE stores ADD COLUMN IF NOT EXISTS logo_url TEXT;
