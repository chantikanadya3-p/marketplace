"use client";

import {
  type FormEvent,
  useMemo,
  useState,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  LoaderCircle,
  PackageSearch,
  Search,
  X,
} from "lucide-react";
import { getProducts } from "@/lib/api/products";

interface ProductSearchProps {
  onClose: () => void;
}

export default function ProductSearch({
  onClose,
}: ProductSearchProps) {
  const router = useRouter();

  const [searchValue, setSearchValue] =
    useState("");

  const {
    data: products = [],
    isPending,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const searchQuery =
    searchValue.trim().toLowerCase();

  const searchResults = useMemo(() => {
    if (!searchQuery) {
      return [];
    }

    return products
      .filter((product) =>
        product.title
          .toLowerCase()
          .includes(searchQuery),
      )
      .slice(0, 5);
  }, [
    products,
    searchQuery,
  ]);

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!searchQuery) return;

    router.push(
      `/?search=${encodeURIComponent(
        searchValue.trim(),
      )}#products`,
    );

    onClose();
  };

  const handleSelectProduct = (
    productId: number,
  ) => {
    router.push(
      `/products/${productId}`,
    );

    onClose();
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{
        width: 36,
        opacity: 0,
      }}
      animate={{
        width: 300,
        opacity: 1,
      }}
      exit={{
        width: 36,
        opacity: 0,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className="relative h-10 w-full max-w-[300px]"
    >
      <Search
        size={17}
        strokeWidth={1.8}
        className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400"
      />

      <input
        type="search"
        value={searchValue}
        onChange={(event) =>
          setSearchValue(
            event.target.value,
          )
        }
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            onClose();
          }
        }}
        placeholder="Search products..."
        autoFocus
        autoComplete="off"
        className="h-10 w-full rounded-md border border-slate-300 bg-white pl-10 pr-10 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#17365f] focus:ring-1 focus:ring-[#17365f]"
      />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close product search"
        className="absolute right-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
      >
        <X
          size={16}
          strokeWidth={1.8}
        />
      </button>

      {searchQuery && (
        <motion.div
          initial={{
            opacity: 0,
            y: -5,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="absolute right-0 top-[calc(100%+8px)] z-[70] w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl"
        >
          {isPending ? (
            <div className="flex min-h-32 flex-col items-center justify-center px-4 py-6 text-slate-500">
              <LoaderCircle
                size={24}
                className="animate-spin"
              />

              <p className="mt-2 text-xs">
                Searching products...
              </p>
            </div>
          ) : searchResults.length >
            0 ? (
            <div className="py-2">
              <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Products
              </p>

              {searchResults.map(
                (product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() =>
                      handleSelectProduct(
                        product.id,
                      )
                    }
                    className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-slate-50"
                  >
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-50">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="44px"
                        className="object-contain p-1.5"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-slate-900">
                        {product.title}
                      </p>

                      <p className="mt-0.5 truncate text-[10px] capitalize text-slate-500">
                        {product.category}
                      </p>
                    </div>

                    <span className="shrink-0 text-[10px] font-medium text-[#17365f]">
                      View
                    </span>
                  </button>
                ),
              )}

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center border-t border-slate-100 px-4 pt-3 text-xs font-semibold text-[#17365f] hover:underline"
              >
                View all results for
                &nbsp;&quot;
                {searchValue.trim()}
                &quot;
              </button>
            </div>
          ) : (
            <div className="flex min-h-40 flex-col items-center justify-center px-5 py-6 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <PackageSearch
                  size={22}
                />
              </div>

              <p className="mt-3 text-sm font-semibold text-slate-900">
                Oops, no results found
              </p>

              <p className="mt-1 max-w-[210px] text-[11px] leading-4 text-slate-500">
                We could not find a product
                matching &quot;
                {searchValue.trim()}
                &quot;.
              </p>
            </div>
          )}
        </motion.div>
      )}
    </motion.form>
  );
}