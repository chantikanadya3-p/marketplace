"use client";

import {
  Grid2X2,
  Grid3X3,
  List,
} from "lucide-react";

export type SortOption =
  | "default"
  | "price-low"
  | "price-high"
  | "rating"
  | "name";

export type ViewMode =
  | "three-columns"
  | "two-columns"
  | "list";

interface ProductToolbarProps {
  resultCount: number;
  totalCount: number;
  sortBy: SortOption;
  viewMode: ViewMode;
  onSortChange: (sort: SortOption) => void;
  onViewChange: (view: ViewMode) => void;
}

export default function ProductToolbar({
  resultCount,
  totalCount,
  sortBy,
  viewMode,
  onSortChange,
  onViewChange,
}: ProductToolbarProps) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Products
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Showing {resultCount} of {totalCount} products
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <span className="whitespace-nowrap">Sort by</span>

          <select
            value={sortBy}
            onChange={(event) =>
              onSortChange(event.target.value as SortOption)
            }
            aria-label="Sort products"
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition-colors focus:border-[#17365f]"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rating</option>
            <option value="name">Name: A–Z</option>
          </select>
        </label>

        <div className="hidden overflow-hidden rounded-md border border-slate-200 sm:flex">
          <button
            type="button"
            onClick={() => onViewChange("three-columns")}
            aria-label="Three-column grid"
            className={`flex h-10 w-10 items-center justify-center border-r border-slate-200 ${
              viewMode === "three-columns"
                ? "bg-slate-100 text-[#17365f]"
                : "bg-white text-slate-500 hover:bg-slate-50"
            }`}
          >
            <Grid3X3 size={17} />
          </button>

          <button
            type="button"
            onClick={() => onViewChange("two-columns")}
            aria-label="Two-column grid"
            className={`flex h-10 w-10 items-center justify-center border-r border-slate-200 ${
              viewMode === "two-columns"
                ? "bg-slate-100 text-[#17365f]"
                : "bg-white text-slate-500 hover:bg-slate-50"
            }`}
          >
            <Grid2X2 size={17} />
          </button>

          <button
            type="button"
            onClick={() => onViewChange("list")}
            aria-label="Single-column view"
            className={`flex h-10 w-10 items-center justify-center ${
              viewMode === "list"
                ? "bg-slate-100 text-[#17365f]"
                : "bg-white text-slate-500 hover:bg-slate-50"
            }`}
          >
            <List size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}