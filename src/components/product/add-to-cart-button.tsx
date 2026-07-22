"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
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
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setIsAdded(true);

    window.setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={handleAddToCart}
      disabled={isAdded}
      className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold text-white transition-colors sm:w-auto ${
        isAdded
          ? "bg-emerald-500"
          : "bg-[#17365f] hover:bg-[#102947]"
      }`}
    >
      {isAdded ? (
        <>
          <Check size={19} />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart size={19} />
          Add to Cart
        </>
      )}
    </motion.button>
  );
}