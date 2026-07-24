"use client";

import {
  type FormEvent,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  X,
} from "lucide-react";

interface ProductSearchProps {
  onClose: () => void;
}

export default function ProductSearch({
  onClose,
}: ProductSearchProps) {
  const router = useRouter();

  const [searchValue, setSearchValue] =
    useState("");

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const normalizedSearch =
      searchValue.trim();

    if (normalizedSearch) {
      router.push(
        `/?search=${encodeURIComponent(
          normalizedSearch,
        )}#products`,
      );
    } else {
      router.push("/#products");
    }

    onClose();
  };

  const handleClose = () => {
    setSearchValue("");
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
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={searchValue}
        onChange={(event) =>
          setSearchValue(
            event.target.value,
          )
        }
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            handleClose();
          }
        }}
        placeholder="Search products..."
        autoFocus
        autoComplete="off"
        aria-label="Search products by name"
        className="h-10 w-full rounded-md border border-slate-300 bg-white pl-10 pr-10 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#17365f] focus:ring-1 focus:ring-[#17365f]"
      />

      <button
        type="button"
        onClick={handleClose}
        aria-label="Close product search"
        className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
      >
        <X
          size={16}
          strokeWidth={1.8}
        />
      </button>
    </motion.form>
  );
}