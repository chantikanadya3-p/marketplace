"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ShoppingCart, Star } from "lucide-react";
import { addToCart } from "@/features/cart/cart-slice";
import { useAppDispatch } from "@/hooks/redux";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  index: number;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export default function ProductCard({
  product,
  index,
}: ProductCardProps) {
  const dispatch = useAppDispatch();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setIsAdded(true);

    window.setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.06, 0.3),
      }}
      whileHover={{ y: -5 }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <Link
        href={`/products/${product.id}`}
        className="relative flex h-64 items-center justify-center overflow-hidden bg-white p-8"
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1 text-amber-400">
          <Star size={16} fill="currentColor" />

          <span className="ml-1 text-sm font-medium text-slate-700">
            {product.rating.rate}
          </span>

          <span className="text-xs text-slate-400">
            ({product.rating.count})
          </span>
        </div>

        <Link href={`/products/${product.id}`}>
          <h3 className="mt-3 line-clamp-2 min-h-12 text-base font-semibold text-slate-900 transition-colors hover:text-[#17365f]">
            {product.title}
          </h3>
        </Link>

        <p className="mt-1 text-xs font-medium1 uppercase tracking-wide text-slate-500">
          {product.category}
        </p>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
          {product.description}
        </p>

        <div className="mt-2 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:items-center min-[400px]:justify-between">
  <p className="break-words text-xl font-bold text-[#17365f]">
    {formatPrice(product.price)}
  </p>

  <button
    type="button"
    onClick={handleAddToCart}
    disabled={isAdded}
    className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition-all min-[400px]:w-auto ${
      isAdded
        ? "bg-emerald-500 text-white"
        : "bg-[#17365f] text-white hover:bg-[#102947]"
    }`}
  >
    {isAdded ? (
      <>
        <Check size={17} />
        Added
      </>
    ) : (
      <>
        <ShoppingCart size={17} />
        Add
      </>
    )}

</button>
          </div>

          <Link
            href={`/products/${product.id}`}
            className="mt-3 inline-flex text-sm font-medium text-[#17365f] hover:underline"
          >
            View details
          </Link>
        </div>
    </motion.article>
  );
}