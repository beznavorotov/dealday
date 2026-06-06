import Link from "next/link";
import AdminStoreTable from "@/components/AdminStoreTable";
import { getStores } from "@/lib/actions/stores";

export const metadata = {
  title: "Адмін-панель — Товари дня",
};

export default async function AdminPage() {
  const stores = await getStores();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Магазини</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Управління картками магазинів на головній сторінці
          </p>
        </div>
        <Link
          href="/admin/create"
          className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          + Створити
        </Link>
      </div>

      <AdminStoreTable stores={stores} />
    </div>
  );
}
