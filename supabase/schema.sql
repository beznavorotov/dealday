-- Таблиця магазинів
CREATE TABLE IF NOT EXISTS stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'Техніка', 'Смартфони', 'Ноутбуки', 'Побутова техніка',
    'Продукти', 'Одяг', 'Авто', 'Інше'
  )),
  image_url TEXT NOT NULL,
  logo_url TEXT,
  product_url TEXT,
  is_deal_active BOOLEAN NOT NULL DEFAULT false,
  deal_date DATE,
  deal_start_date DATE,
  deal_end_date DATE,
  display_order INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT stores_name_unique UNIQUE (name)
);

-- Автоматичне оновлення updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS stores_updated_at ON stores;
CREATE TRIGGER stores_updated_at
  BEFORE UPDATE ON stores
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "stores_select_public"
  ON stores FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "stores_insert_auth"
  ON stores FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "stores_update_auth"
  ON stores FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "stores_delete_auth"
  ON stores FOR DELETE
  TO authenticated
  USING (true);

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
