export const CATEGORIES = [
  "Техніка",
  "Смартфони",
  "Ноутбуки",
  "Побутова техніка",
  "Продукти",
  "Одяг",
  "Авто",
  "Інше",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Store {
  id: string;
  name: string;
  category: Category;
  image_url: string;
  logo_url?: string | null;
  product_url: string | null;
  is_deal_active: boolean;
  deal_date: string | null;
  display_order: number;
  clicks: number;
  created_at: string;
  updated_at: string;
}

export interface StoreFormData {
  name: string;
  category: Category;
  image_url: string;
  logo_url: string;
  product_url: string;
  is_deal_active: boolean;
  display_order: number;
}
