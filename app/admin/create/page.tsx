import AdminStoreForm from "@/components/AdminStoreForm";
import { createStore } from "@/lib/actions/stores";

export const metadata = {
  title: "Створити магазин — Товари дня",
};

export default function CreateStorePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Новий магазин</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Заповніть дані для нової картки на головній сторінці
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <AdminStoreForm action={createStore} />
      </div>
    </div>
  );
}
