import OrderButton from "@/components/OrderButton";
import StoreLogo from "@/components/StoreLogo";
import { formatDateUk } from "@/lib/utils/date";
import type { Store } from "@/types/store";

interface ProductCardProps {
  store: Store;
}

export default function ProductCard({ store }: ProductCardProps) {
  const isActive = store.is_deal_active && !!store.product_url;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-200/50">
      <div className="relative min-h-[450px] aspect-[16/9] overflow-hidden bg-zinc-100">
        <img
          src={store.image_url || "/placeholder.svg"}
          alt={store.name}
          className={`h-full w-full object-cover transition-transform duration-500 ${
            isActive ? "group-hover:scale-105" : "brightness-[0.45] saturate-50"
          }`}
        />

        {!isActive && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/10" />
        )}

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-zinc-700 shadow-sm backdrop-blur-sm min-[375px]:px-3 min-[375px]:text-xs">
            {store.category}
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm backdrop-blur-sm min-[375px]:px-3 min-[375px]:text-xs ${
              isActive
                ? "bg-emerald-500/90 text-white"
                : "bg-zinc-800/70 text-zinc-200"
            }`}
          >
            {isActive ? "Активно" : "Очікується"}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-3.5 min-[375px]:gap-3 min-[375px]:p-4">
        <div className="flex items-center gap-2.5 min-[375px]:gap-3">
          <StoreLogo name={store.name} logoUrl={store.logo_url} />
          <h3 className="line-clamp-2 min-w-0 flex-1 text-sm font-semibold leading-snug text-zinc-900 min-[375px]:text-base">
            {store.name}
          </h3>
        </div>

        {store.deal_date && (
          <p className="flex items-center gap-1.5 text-xs text-zinc-400 min-[375px]:text-sm">
            <CalendarIcon />
            <span suppressHydrationWarning>
              {formatDateUk(store.deal_date)}
            </span>
          </p>
        )}

        {isActive ? (
          <OrderButton storeId={store.id} productUrl={store.product_url!} />
        ) : (
          <button
            disabled
            className="mt-auto inline-flex cursor-not-allowed items-center justify-center rounded-xl bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-400 ring-1 ring-zinc-200/80 min-[375px]:py-3"
          >
            Замовити
          </button>
        )}
      </div>
    </article>
  );
}

function CalendarIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
      />
    </svg>
  );
}
