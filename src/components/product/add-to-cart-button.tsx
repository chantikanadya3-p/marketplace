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
    }, 1600);
  };

  return (
    <motion.button
      type="button"
      onClick={handleAddToCart}
      whileHover={{
        scale: 1.01,
      }}
      whileTap={{
        scale: 0.97,
      }}
      animate={
        isAdded
          ? {
              backgroundColor: "#059669",
            }
          : {
              backgroundColor: "#17365f",
            }
      }
      transition={{
        duration: 0.2,
      }}
      className="flex h-11 w-full items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold text-white shadow-sm"
    >
      <motion.span
        key={isAdded ? "added" : "cart"}
        initial={{
          opacity: 0,
          scale: 0.7,
          y: 3,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        className="flex items-center gap-2"
      >
        {isAdded ? (
          <>
            <Check size={17} />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingCart size={17} />
            Add to Cart
          </>
        )}
      </motion.span>
    </motion.button>
  );
}