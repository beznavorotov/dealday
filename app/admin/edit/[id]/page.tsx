import { notFound } from "next/navigation";
import AdminStoreForm from "@/components/AdminStoreForm";
import { getStoreById, updateStore } from "@/lib/actions/stores";

interface EditStorePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EditStorePageProps) {
  const { id } = await params;
  try {
    const store = await getStoreById(id);
    return { title: `Редагувати ${store.name} — Товари дня` };
  } catch {
    return { title: "Редагувати магазин — Товари дня" };
  }
}

export default async function EditStorePage({ params }: EditStorePageProps) {
  const { id } = await params;

  let store;
  try {
    store = await getStoreById(id);
  } catch {
    notFound();
  }

  const boundUpdate = updateStore.bind(null, id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">
          Редагувати: {store.name}
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Оновіть товар дня: картинку, посилання, статус і дату. Назва та
          категорія задаються один раз при створенні.
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <AdminStoreForm store={store} action={boundUpdate} />
      </div>
    </div>
  );
}
