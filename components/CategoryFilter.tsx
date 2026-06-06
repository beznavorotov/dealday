"use client";

import { CATEGORIES } from "@/types/store";

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

const FILTER_OPTIONS = ["Всі", ...CATEGORIES];

export default function CategoryFilter({
  selected,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="relative -mx-3 min-[375px]:-mx-0">
      <div className="scrollbar-hide flex gap-2 overflow-x-auto px-3 pb-1 min-[375px]:flex-wrap min-[375px]:overflow-visible min-[375px]:px-0">
        {FILTER_OPTIONS.map((category) => {
          const isSelected = selected === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onChange(category)}
              className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-medium transition-all min-[375px]:px-4 min-[375px]:text-sm ${
                isSelected
                  ? "bg-zinc-900 text-white shadow-md shadow-zinc-900/20"
                  : "bg-white text-zinc-600 ring-1 ring-zinc-200 hover:bg-zinc-50 hover:text-zinc-900 hover:ring-zinc-300"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
