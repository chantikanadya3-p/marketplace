"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  PackageSearch,
  RefreshCcw,
} from "lucide-react";
import { getProducts } from "@/lib/api/products";
import FilterSidebar, {
  type PriceRange,
} from "./filter-sidebar";
import ProductCard from "./product-card";
import ProductCardSkeleton from "./product-card-skeleton";
import ProductToolbar, {
  type SortOption,
  type ViewMode,
} from "./product-toolbar";
import type { Product } from "@/types/product";

function isPriceInRange(
  price: number,
  range: PriceRange,
) {
  switch (range) {
    case "under-25":
      return price < 25;

    case "25-50":
      return price >= 25 && price <= 50;

    case "50-100":
      return price > 50 && price <= 100;

    case "over-100":
      return price > 100;

    default:
      return true;
  }
}

function sortProducts(
  products: Product[],
  sortBy: SortOption,
) {
  const sortedProducts = [...products];

  switch (sortBy) {
    case "price-low":
      return sortedProducts.sort(
        (first, second) => first.price - second.price,
      );

    case "price-high":
      return sortedProducts.sort(
        (first, second) => second.price - first.price,
      );

    case "rating":
      return sortedProducts.sort(
        (first, second) =>
          second.rating.rate - first.rating.rate,
      );

    case "name":
      return sortedProducts.sort((first, second) =>
        first.title.localeCompare(second.title),
      );

    default:
      return sortedProducts;
  }
}

function getGridClass(viewMode: ViewMode) {
  switch (viewMode) {
    case "two-columns":
      return "grid grid-cols-1 gap-5 sm:grid-cols-2";

    case "list":
      return "grid grid-cols-1 gap-5";

    default:
      return "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3";
  }
}

export default function ProductGrid() {
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const [selectedPriceRange, setSelectedPriceRange] =
    useState<PriceRange>("all");

  const [sortBy, setSortBy] =
    useState<SortOption>("default");

  const [viewMode, setViewMode] =
    useState<ViewMode>("three-columns");

  const {
    data: products = [],
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const categories = useMemo(() => {
    return Array.from(
      new Set(products.map((product) => product.category)),
    ).sort();
  }, [products]);

  const displayedProducts = useMemo(() => {
    const filteredProducts = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      const matchesPrice = isPriceInRange(
        product.price,
        selectedPriceRange,
      );

      return matchesCategory && matchesPrice;
    });

    return sortProducts(filteredProducts, sortBy);
  }, [
    products,
    selectedCategory,
    selectedPriceRange,
    sortBy,
  ]);

  const handleReset = () => {
    setSelectedCategory("all");
    setSelectedPriceRange("all");
  };

  if (isError) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 px-5 text-center">
        <AlertCircle size={36} className="text-red-500" />

        <h3 className="mt-4 text-lg font-semibold text-slate-900">
          Unable to load products
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Please check your connection and try again.
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#17365f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#102947]"
        >
          <RefreshCcw size={16} />
          Try again
        </button>
      </div>
    );
  }

  return (
<div className="grid items-start gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">      <FilterSidebar
        categories={categories}
        selectedCategory={selectedCategory}
        selectedPriceRange={selectedPriceRange}
        onCategoryChange={setSelectedCategory}
        onPriceRangeChange={setSelectedPriceRange}
        onReset={handleReset}
      />

      <div className="min-w-0">
        <ProductToolbar
          resultCount={displayedProducts.length}
          totalCount={products.length}
          sortBy={sortBy}
          viewMode={viewMode}
          onSortChange={setSortBy}
          onViewChange={setViewMode}
        />

        {isPending ? (
          <div className={getGridClass(viewMode)}>
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : displayedProducts.length > 0 ? (
          <div className={getGridClass(viewMode)}>
            {displayedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 px-5 text-center">
            <PackageSearch
              size={40}
              className="text-slate-400"
            />

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No products found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try selecting another category or price range.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="mt-5 rounded-md bg-[#17365f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#102947]"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}