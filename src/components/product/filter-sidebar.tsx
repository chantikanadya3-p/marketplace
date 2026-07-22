"use client";

import { useState } from "react";
import {
  Check,
  ChevronDown,
  Filter,
  RotateCcw,
} from "lucide-react";

export type PriceRange =
  | "all"
  | "under-25"
  | "25-50"
  | "50-100"
  | "over-100";

interface FilterSidebarProps {
  categories: string[];
  selectedCategory: string;
  selectedPriceRange: PriceRange;
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (range: PriceRange) => void;
  onReset: () => void;
}

const priceOptions: Array<{
  label: string;
  value: PriceRange;
}> = [
  {
    label: "All Prices",
    value: "all",
  },
  {
    label: "Under $25",
    value: "under-25",
  },
  {
    label: "$25 - $50",
    value: "25-50",
  },
  {
    label: "$50 - $100",
    value: "50-100",
  },
  {
    label: "$100+",
    value: "over-100",
  },
];

function formatCategory(category: string) {
  return category
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

export default function FilterSidebar({
  categories,
  selectedCategory,
  selectedPriceRange,
  onCategoryChange,
  onPriceRangeChange,
  onReset,
}: FilterSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const hasActiveFilter =
    selectedCategory !== "all" ||
    selectedPriceRange !== "all";

  return (
<aside className="w-full min-w-0">      
    <button
        type="button"
        onClick={() => setIsMobileOpen((current) => !current)}
        aria-expanded={isMobileOpen}
        className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-[#17365f] lg:hidden"
      >
        <span className="flex items-center gap-2 font-semibold">
          <Filter size={19} />
          Filters
        </span>

        <ChevronDown
          size={19}
          className={`transition-transform ${
            isMobileOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`mt-3 rounded-xl border border-slate-200 bg-white p-5 lg:mt-0 lg:block lg:border-0 lg:p-0 ${
          isMobileOpen ? "block" : "hidden"
        }`}
      >
        <div className="hidden h-[49px] items-start gap-2 pt-1 text-[#17365f] lg:flex">
  <Filter size={18} />
  <h2 className="text-base font-semibold leading-5">
    Filters
  </h2>
</div>

        <div className="mt-2 lg:mt-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Category
          </h3>

          <div className="mt-4 flex flex-col">
            <button
              type="button"
              onClick={() => onCategoryChange("all")}
              className={`border-b px-0 py-2 text-left text-sm transition-colors ${
                selectedCategory === "all"
                  ? "border-[#17365f] font-medium text-[#17365f]"
                  : "border-transparent text-slate-500 hover:text-[#17365f]"
              }`}
            >
              All Categories
            </button>

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                className={`border-b px-0 py-2 text-left text-sm transition-colors ${
                  selectedCategory === category
                    ? "border-[#17365f] font-medium text-[#17365f]"
                    : "border-transparent text-slate-500 hover:text-[#17365f]"
                }`}
              >
                {formatCategory(category)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Price Range
          </h3>

          <div className="mt-4 w-full space-y-3">
  {priceOptions.map((option) => {
    const isSelected =
      selectedPriceRange === option.value;

    return (
      <label
        key={option.value}
        className="group flex cursor-pointer items-center justify-between gap-3"
      >
        <span
          className={`text-sm transition-colors ${
            isSelected
              ? "font-medium text-[#17365f]"
              : "text-slate-600 group-hover:text-[#17365f]"
          }`}
        >
          {option.label}
        </span>

        <input
          type="radio"
          name="price-range"
          value={option.value}
          checked={isSelected}
          onChange={() =>
            onPriceRangeChange(option.value)
          }
          className="sr-only"
        />

        <span
          aria-hidden="true"
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
            isSelected
              ? "border-[#17365f] bg-[#17365f] text-white"
              : "border-slate-300 bg-white group-hover:border-[#17365f]"
          }`}
        >
          {isSelected && (
            <Check
              size={14}
              strokeWidth={3}
            />
          )}
        </span>
      </label>
    );
  })}
</div>
    </div>

        {hasActiveFilter && (
          <button
            type="button"
            onClick={onReset}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#17365f] px-4 py-2.5 text-sm font-semibold text-[#17365f] transition-colors hover:bg-[#17365f] hover:text-white"
          >
            <RotateCcw size={16} />
            Reset Filters
          </button>
        )}
      </div>
    </aside>
  );
}