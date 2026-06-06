"use client";

import { useMemo, useState } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import type { Store } from "@/types/store";

interface HomeContentProps {
  stores: Store[];
}

export default function HomeContent({ stores }: HomeContentProps) {
  const [selectedCategory, setSelectedCategory] = useState("Всі");

  const filteredStores = useMemo(() => {
    if (selectedCategory === "Всі") return stores;
    return stores.filter((store) => store.category === selectedCategory);
  }, [stores, selectedCategory]);

  const activeCount = useMemo(
    () => stores.filter((s) => s.is_deal_active && s.product_url).length,
    [stores]
  );

  return (
    <>
{/* Hero */}
{/* Hero */}
<section className="rounded-2xl border border-zinc-200/70 bg-white px-4 py-4 shadow-sm sm:px-5">
  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
    <div>
      <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl">
        Товари дня
        <span className="ml-2 text-orange-500">від перевірених магазинів</span>
      </h1>

      <p className="mt-1 text-sm text-zinc-500">
        Актуальні пропозиції зі знижками від популярних магазинів України.
      </p>
    </div>

    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-600">
        <span className="h-2 w-2 rounded-full bg-orange-500" />
        Оновлюється щодня
      </span>

      {stores.length > 0 && (
        <>
          <span className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs text-zinc-600">
            <strong className="text-zinc-900">{stores.length}</strong> магазинів
          </span>

          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs text-emerald-700">
            <strong>{activeCount}</strong> активних
          </span>
        </>
      )}

      <CountdownTimer />
    </div>
  </div>
</section>

      {/* Catalog */}
      <section className="mt-8 space-y-5 min-[375px]:mt-10 min-[375px]:space-y-6">
        <div className="flex flex-col gap-1 min-[430px]:flex-row min-[430px]:items-end min-[430px]:justify-between">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 min-[375px]:text-xl">
              Каталог пропозицій
            </h2>
            <p className="text-xs text-zinc-400 min-[375px]:text-sm">
              {filteredStores.length}{" "}
              {filteredStores.length === 1
                ? "пропозиція"
                : filteredStores.length < 5
                  ? "пропозиції"
                  : "пропозицій"}
              {selectedCategory !== "Всі" && ` · ${selectedCategory}`}
            </p>
          </div>
        </div>

        <CategoryFilter
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />

        {filteredStores.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-5 py-14 text-center min-[375px]:px-6 min-[375px]:py-16">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
              <svg
                className="h-6 w-6 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-zinc-600 min-[375px]:text-base">
              {stores.length === 0
                ? "Наразі немає магазинів"
                : "У цій категорії поки немає пропозицій"}
            </p>
            <p className="mt-1 text-xs text-zinc-400 min-[375px]:text-sm">
              Зайдіть пізніше — нові товари дня з&apos;являються щодня
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredStores.map((store) => (
              <ProductCard key={store.id} store={store} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}