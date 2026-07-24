"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  ChevronRight,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
import ProductSearch from "@/components/product/product-search";
import { useAppSelector } from "@/hooks/redux";

const navigationItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Inventory",
    href: "/#products",
  },
  {
    label: "Financing",
    href: "/#financing",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [isPromoVisible, setIsPromoVisible] =
    useState(true);

  const [isSearchOpen, setIsSearchOpen] =
    useState(false);

  const totalItems = useAppSelector((state) =>
    state.cart.items.reduce(
      (total, item) =>
        total + item.quantity,
      0,
    ),
  );

  const displayedCartCount =
    totalItems > 99 ? "99+" : totalItems;

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
    setIsMenuOpen(false);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      {isPromoVisible && (
        <div className="h-8 border-b border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <div className="mx-auto flex h-full max-w-[1120px] items-center justify-center px-4 sm:px-8">
            <div className="flex items-center gap-2 text-[9px] text-slate-600 sm:text-[10px]">
              <button
                type="button"
                onClick={() =>
                  setIsPromoVisible(false)
                }
                aria-label="Close promotion"
                className="flex h-4 w-4 items-center justify-center text-[#17365f] hover:text-slate-900"
              >
                <X
                  size={10}
                  strokeWidth={2}
                />
              </button>

              <span className="font-semibold text-slate-800">
                Premium Selection
              </span>

              <span className="hidden text-slate-400 sm:inline">
                —
              </span>

              <span className="hidden sm:inline">
                Certified Pre-Owned Vehicles
              </span>

              <Link
                href="/#products"
                className="inline-flex items-center gap-0.5 font-semibold text-[#17365f] hover:underline"
              >
                <span className="sm:hidden">
                  Browse
                </span>

                <span className="hidden sm:inline">
                  Browse Inventory
                </span>

                <ChevronRight
                  size={11}
                  strokeWidth={1.8}
                />
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="w-full border-b border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <nav className="mx-auto flex h-[53px] w-full max-w-[1440px] items-center justify-between px-4 sm:h-[72px] sm:px-8 lg:px-16">
          <div
            className={`flex shrink-0 items-center ${
              isSearchOpen
                ? "gap-0 md:gap-10"
                : "gap-10"
            }`}
          >
            <Link
              href="/"
              onClick={closeMenu}
              className={`font-bold tracking-tight text-[#17365f] ${
                isSearchOpen
                  ? "hidden md:block md:text-xl"
                  : "text-sm sm:text-xl"
              }`}
            >
              TJERMIN
            </Link>

            <div className="hidden items-center gap-7 md:flex">
              {navigationItems.map(
                (item, index) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-sm transition-colors hover:text-[#17365f] ${
                      index === 0
                        ? "font-medium text-[#17365f]"
                        : "text-slate-500"
                    }`}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          </div>

          <div
            className={`flex min-w-0 items-center text-[#17365f] ${
              isSearchOpen
                ? "w-full justify-end gap-1 md:w-auto sm:gap-3"
                : "gap-1 sm:gap-3"
            }`}
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              {isSearchOpen ? (
                <ProductSearch
                  key="product-search"
                  onClose={closeSearch}
                />
              ) : (
                <motion.button
                  key="search-button"
                  type="button"
                  onClick={openSearch}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  aria-label="Search products"
                  className="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-slate-100"
                >
                  <Search
                    size={17}
                    strokeWidth={1.8}
                  />
                </motion.button>
              )}
            </AnimatePresence>

            {!isSearchOpen && (
              <>
                <button
                  type="button"
                  aria-label="User account"
                  className="hidden h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-slate-100 sm:flex"
                >
                  <UserRound
                    size={18}
                    strokeWidth={1.8}
                  />
                </button>

                <Link
                  href="/cart"
                  aria-label={
                    totalItems > 0
                      ? `Shopping cart with ${totalItems} items`
                      : "Shopping cart is empty"
                  }
                  className="relative flex h-9 w-9 items-center justify-center rounded-md text-[#17365f] transition-colors hover:bg-slate-100"
                >
                  <ShoppingCart
                    size={19}
                    strokeWidth={1.8}
                  />

                  {totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{
                        opacity: 0,
                        scale: 0.5,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      className="absolute right-0 top-0 flex h-4 min-w-4 translate-x-[15%] -translate-y-[5%] items-center justify-center rounded-full bg-[#17365f] px-1 text-[9px] font-bold leading-none text-white sm:h-[18px] sm:min-w-[18px] sm:text-[10px]"
                    >
                      {
                        displayedCartCount
                      }
                    </motion.span>
                  )}
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    setIsMenuOpen(
                      (current) =>
                        !current,
                    )
                  }
                  aria-label={
                    isMenuOpen
                      ? "Close navigation menu"
                      : "Open navigation menu"
                  }
                  aria-expanded={
                    isMenuOpen
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-slate-100 md:hidden"
                >
                  {isMenuOpen ? (
                    <X
                      size={20}
                      strokeWidth={1.8}
                    />
                  ) : (
                    <Menu
                      size={20}
                      strokeWidth={1.8}
                    />
                  )}
                </button>
              </>
            )}
          </div>
        </nav>
      </div>

      {isMenuOpen &&
        !isSearchOpen && (
          <div className="border-b border-[#E5E7EB] bg-white px-4 py-3 shadow-lg md:hidden">
            <nav
              aria-label="Mobile navigation"
              className="mx-auto flex flex-col"
            >
              {navigationItems.map(
                (item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className="rounded-md px-3 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-[#17365f]"
                  >
                    {item.label}
                  </Link>
                ),
              )}

              <Link
                href="/account"
                onClick={closeMenu}
                className="mt-2 flex items-center gap-3 border-t border-slate-100 px-3 pt-4 text-sm font-medium text-slate-600"
              >
                <UserRound size={18} />
                Account
              </Link>
            </nav>
          </div>
        )}
    </header>
  );
}