"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StoreLogo from "@/components/StoreLogo";
import { deleteStore, toggleDealActive } from "@/lib/actions/stores";
import { formatDateUk } from "@/lib/utils/date";
import type { Store } from "@/types/store";

interface AdminStoreTableProps {
  stores: Store[];
}

export default function AdminStoreTable({ stores }: AdminStoreTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  async function handleToggle(id: string, current: boolean) {
    setTogglingId(id);
    try {
      await toggleDealActive(id, !current);
      router.refresh();
    } finally {
      setTogglingId(null);
    }
  }

  async function handleDelete(id: string, name: string) {
    const confirmed = window.confirm(
      `Видалити магазин «${name}»? Цю дію не можна скасувати.`
    );
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await deleteStore(id);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Не вдалося видалити магазин");
    } finally {
      setDeletingId(null);
    }
  }

  if (stores.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-12 text-center">
        <p className="text-zinc-500">Магазинів ще немає.</p>
        <Link
          href="/admin/create"
          className="mt-4 inline-block text-sm font-medium text-orange-600 hover:text-orange-700"
        >
          Створити перший магазин →
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50">
            <tr>
              <th className="px-4 py-3 font-semibold text-zinc-700">Логотип</th>
              <th className="px-4 py-3 font-semibold text-zinc-700">Назва</th>
              <th className="px-4 py-3 font-semibold text-zinc-700">Категорія</th>
              <th className="px-4 py-3 font-semibold text-zinc-700">Дата товару</th>
              <th className="px-4 py-3 font-semibold text-zinc-700">Статус</th>
              <th className="px-4 py-3 font-semibold text-zinc-700">Кліки</th>
              <th className="px-4 py-3 font-semibold text-zinc-700">Дії</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {stores.map((store) => (
              <tr key={store.id} className="hover:bg-zinc-50/50">
                <td className="px-4 py-3">
                  <StoreLogo
                    name={store.name}
                    logoUrl={store.logo_url}
                    size="sm"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-zinc-900">
                  {store.name}
                </td>
                <td className="px-4 py-3 text-zinc-600">{store.category}</td>
                <td className="px-4 py-3 text-zinc-600">
                  {store.deal_date ? formatDateUk(store.deal_date) : "—"}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    disabled={togglingId === store.id}
                    onClick={() =>
                      handleToggle(store.id, store.is_deal_active)
                    }
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold transition-colors disabled:opacity-50 ${
                      store.is_deal_active
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    {togglingId === store.id
                      ? "..."
                      : store.is_deal_active
                        ? "Активний"
                        : "Неактивний"}
                  </button>
                </td>
                <td className="px-4 py-3 text-zinc-600">{store.clicks ?? 0}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/edit/${store.id}`}
                      className="font-medium text-orange-600 hover:text-orange-700"
                    >
                      Редагувати
                    </Link>
                    <button
                      type="button"
                      disabled={deletingId === store.id}
                      onClick={() => handleDelete(store.id, store.name)}
                      className="font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
                    >
                      {deletingId === store.id ? "Видалення..." : "Видалити"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
