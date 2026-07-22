"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Heart,
  Star,
} from "lucide-react";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  index: number;
}

type BadgeType =
  | "promo"
  | "premium"
  | "best-deal";

interface ProductBadge {
  label: string;
  type: BadgeType;
}

const productBadges: Record<number, ProductBadge[]> = {
  3: [
    {
      label: "PROMO",
      type: "promo",
    },
  ],
  5: [
    {
      label: "PREMIUM",
      type: "premium",
    },
  ],
  7: [
    {
      label: "BEST DEAL",
      type: "best-deal",
    },
    {
      label: "PROMO",
      type: "promo",
    },
  ],
  9: [
    {
      label: "PROMO",
      type: "promo",
    },
  ],
  12: [
    {
      label: "PREMIUM",
      type: "premium",
    },
  ],
  15: [
    {
      label: "BEST DEAL",
      type: "best-deal",
    },
  ],
  18: [
    {
      label: "PROMO",
      type: "promo",
    },
  ],
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function getBadgeClass(type: BadgeType) {
  switch (type) {
    case "promo":
      return "bg-emerald-500 text-white";

    case "premium":
      return "bg-[#17365f] text-white";

    case "best-deal":
      return "bg-amber-500 text-white";
  }
}

export default function ProductCard({
  product,
  index,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] =
    useState(false);

  const badges = productBadges[product.id] ?? [];

  const handleFavorite = () => {
    setIsFavorite((current) => !current);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: Math.min(index * 0.04, 0.2),
      }}
      whileHover={{ y: -3 }}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
        <Link
          href={`/products/${product.id}`}
          className="block h-full w-full"
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {badges.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {badges.map((badge) => (
              <span
                key={`${product.id}-${badge.label}`}
                className={`rounded px-2 py-1 text-[9px] font-bold uppercase tracking-wide shadow-sm ${getBadgeClass(
                  badge.type,
                )}`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={handleFavorite}
          aria-label={
            isFavorite
              ? `Remove ${product.title} from wishlist`
              : `Add ${product.title} to wishlist`
          }
          title={
            isFavorite
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-105 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
        >
          <Heart
            size={17}
            strokeWidth={1.8}
            fill={
              isFavorite ? "currentColor" : "none"
            }
            className={
              isFavorite
                ? "text-rose-500"
                : "text-[#17365f]"
            }
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div
          className="flex items-center gap-1 text-amber-400"
          aria-label={`Rating ${product.rating.rate} out of 5`}
        >
          {Array.from({ length: 5 }).map(
            (_, starIndex) => (
              <Star
                key={starIndex}
                size={12}
                strokeWidth={1.5}
                fill="currentColor"
              />
            ),
          )}
        </div>

        <Link
          href={`/products/${product.id}`}
          className="mt-3"
        >
          <h3
            title={product.title}
            className="truncate text-sm font-semibold text-slate-900 transition-colors hover:text-[#17365f]"
          >
            {product.title}
          </h3>
        </Link>

        <p className="mt-1 truncate text-[10px] font-medium uppercase tracking-wide text-slate-500">
          {product.category}
        </p>

        <p className="mt-4 line-clamp-2 min-h-10 text-xs leading-5 text-slate-500">
          {product.description}
        </p>

        <div className="mt-4 border-t border-slate-200 pt-3">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] text-slate-500">
                Starting at
              </p>

              <p className="truncate text-base font-bold text-[#17365f]">
                {formatPrice(product.price)}
              </p>
            </div>

            <Link
              href={`/products/${product.id}`}
              className="mb-0.5 inline-flex shrink-0 items-center gap-0.5 text-xs font-medium text-[#17365f] hover:text-[#102947]"
            >
              View

              <ChevronRight
                size={13}
                strokeWidth={1.8}
              />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}