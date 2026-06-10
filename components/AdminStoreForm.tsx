"use client";

import { useState } from "react";
import { CATEGORIES } from "@/types/store";
import type { Store, StoreFormData } from "@/types/store";

interface AdminStoreFormProps {
  store?: Store;
  action: (formData: StoreFormData) => Promise<void>;
}

function getTodayIso(): string {
  return new Date().toISOString().split("T")[0];
}

const defaultValues: StoreFormData = {
  name: "",
  category: "Техніка",
  image_url: "",
  logo_url: "",
  product_url: "",
  is_deal_active: false,
  deal_start_date: getTodayIso(),
  deal_end_date: getTodayIso(),
  display_order: 0,
};

export default function AdminStoreForm({ store, action }: AdminStoreFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const today = getTodayIso();

  const initial = store
    ? {
        name: store.name,
        category: store.category,
        image_url: store.image_url,
        logo_url: store.logo_url ?? "",
        product_url: store.product_url,
        is_deal_active: store.is_deal_active,
        deal_start_date: store.deal_start_date ?? store.deal_date ?? today,
        deal_end_date: store.deal_end_date ?? store.deal_date ?? today,
        display_order: store.display_order,
      }
    : defaultValues;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const data: StoreFormData = {
      name: form.get("name") as string,
      category: form.get("category") as StoreFormData["category"],
      image_url: form.get("image_url") as string,
      logo_url: form.get("logo_url") as string,
      product_url: form.get("product_url") as string,
      is_deal_active: form.get("is_deal_active") === "true",
      deal_start_date: form.get("deal_start_date") as string,
      deal_end_date: form.get("deal_end_date") as string,
      display_order: Number(form.get("display_order")) || 0,
    };

    try {
      await action(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Сталася помилка");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
            Назва магазину
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            readOnly={!!store}
            defaultValue={initial.name}
            className={`w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ${
              store ? "cursor-not-allowed bg-zinc-50 text-zinc-500" : ""
            }`}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-zinc-700"
          >
            Категорія
          </label>
          <select
            id="category"
            name="category"
            defaultValue={initial.category}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="display_order"
            className="block text-sm font-medium text-zinc-700"
          >
            Порядок відображення
          </label>
          <input
            id="display_order"
            name="display_order"
            type="number"
            step="1"
            defaultValue={initial.display_order}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label
            htmlFor="logo_url"
            className="block text-sm font-medium text-zinc-700"
          >
            Посилання на логотип магазину
          </label>
          <input
            id="logo_url"
            name="logo_url"
            type="url"
            defaultValue={initial.logo_url}
            placeholder="https://... (необовʼязково)"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label
            htmlFor="image_url"
            className="block text-sm font-medium text-zinc-700"
          >
            Посилання на картинку
          </label>
          <input
            id="image_url"
            name="image_url"
            type="url"
            required
            defaultValue={initial.image_url}
            placeholder="https://..."
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label
            htmlFor="product_url"
            className="block text-sm font-medium text-zinc-700"
          >
            Посилання на товар
          </label>
          <input
            id="product_url"
            name="product_url"
            type="url"
            required
            defaultValue={initial.product_url ?? ""}
            placeholder="https://..."
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="deal_start_date"
            className="block text-sm font-medium text-zinc-700"
          >
            Дата початку акції
          </label>
          <input
            id="deal_start_date"
            name="deal_start_date"
            type="date"
            required
            defaultValue={initial.deal_start_date}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="deal_end_date"
            className="block text-sm font-medium text-zinc-700"
          >
            Дата завершення акції
          </label>
          <input
            id="deal_end_date"
            name="deal_end_date"
            type="date"
            required
            defaultValue={initial.deal_end_date}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>

        <fieldset className="space-y-3 sm:col-span-2">
          <legend className="text-sm font-medium text-zinc-700">
            Активний товар дня
          </legend>
          <div className="flex gap-6">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
              <input
                type="radio"
                name="is_deal_active"
                value="true"
                defaultChecked={initial.is_deal_active}
                className="h-4 w-4 border-zinc-300 text-orange-500 focus:ring-orange-500"
              />
              Так
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
              <input
                type="radio"
                name="is_deal_active"
                value="false"
                defaultChecked={!initial.is_deal_active}
                className="h-4 w-4 border-zinc-300 text-orange-500 focus:ring-orange-500"
              />
              Ні
            </label>
          </div>
        </fieldset>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Збереження..." : store ? "Оновити" : "Створити"}
        </button>
        <a
          href="/admin"
          className="rounded-lg border border-zinc-300 px-6 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
        >
          Скасувати
        </a>
      </div>
    </form>
  );
}
