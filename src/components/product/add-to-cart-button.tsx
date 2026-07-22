"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  ShoppingCart,
} from "lucide-react";
import { addToCart } from "@/features/cart/cart-slice";
import { useAppDispatch } from "@/hooks/redux";
import type { Product } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const dispatch = useAppDispatch();
  const [isAdded, setIsAdded] =
    useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setIsAdded(true);

    window.setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={handleAddToCart}
      disabled={isAdded}
      className={`flex h-12 w-full items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold text-white transition-colors ${
        isAdded
          ? "bg-emerald-500"
          : "bg-[#17365f] hover:bg-[#102947]"
      }`}
    >
      {isAdded ? (
        <>
          <Check
            size={18}
            strokeWidth={2.5}
          />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart
            size={18}
            strokeWidth={1.8}
          />
          Add to Cart
        </>
      )}
    </motion.button>
  );
}