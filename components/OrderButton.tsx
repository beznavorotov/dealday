"use client";

import { incrementStoreClicks } from "@/lib/actions/stores";

interface OrderButtonProps {
  storeId: string;
  productUrl: string;
}

export default function OrderButton({ storeId, productUrl }: OrderButtonProps) {
  async function handleClick() {
    try {
      await incrementStoreClicks(storeId);
    } catch {
      // Статистика не повинна блокувати перехід на товар.
    }

    window.open(productUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition-all hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:shadow-orange-500/30 active:scale-[0.98] min-[375px]:py-3"
    >
      Замовити
      <ArrowIcon />
    </button>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  );
}
