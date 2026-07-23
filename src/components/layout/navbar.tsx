"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
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

  const totalItems = useAppSelector((state) =>
    state.cart.items.reduce(
      (total, item) =>
        total + item.quantity,
      0,
    ),
  );

  const displayedCartCount =
    totalItems > 0
      ? totalItems > 99
        ? "99+"
        : totalItems
      : 3;

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      {isPromoVisible && (
        <div className="hidden h-8 border-b border-[#E5E7EB] bg-white md:block">
          <div className="mx-auto flex h-full max-w-[1120px] items-center justify-center px-8">
            <div className="flex items-center gap-2 text-[10px] text-slate-600">
              <button
                type="button"
                onClick={() =>
                  setIsPromoVisible(false)
                }
                aria-label="Close promotion"
                className="flex h-4 w-4 items-center justify-center text-[#17365f] transition-colors hover:text-slate-900"
              >
                <X
                  size={11}
                  strokeWidth={2}
                />
              </button>

              <span className="font-semibold text-slate-800">
                Premium Selection
              </span>

              <span className="text-slate-400">
                —
              </span>

              <span>
                Certified Pre-Owned Vehicles
              </span>

              <Link
                href="/#products"
                className="inline-flex items-center gap-0.5 font-semibold text-[#17365f] hover:underline"
              >
                Browse Inventory

                <ChevronRight
                  size={11}
                  strokeWidth={1.8}
                />
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="w-full border-b border-[#E5E7EB] bg-white">
        <nav className="mx-auto flex h-[53px] w-full max-w-[1440px] items-center justify-between px-4 sm:h-[72px] sm:px-8 lg:px-16">
          <div className="flex items-center gap-10">
            <Link
              href="/"
              onClick={closeMenu}
              className="text-sm font-bold tracking-tight text-[#17365f] sm:text-xl"
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

          <div className="flex items-center gap-1 text-[#17365f] sm:gap-3">
            <button
              type="button"
              aria-label="Search products"
              className="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-slate-100"
            >
              <Search
                size={17}
                strokeWidth={1.8}
              />
            </button>

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
              aria-label={`Shopping cart with ${displayedCartCount} items`}
              className="relative flex h-9 w-9 items-center justify-center rounded-md text-[#17365f] transition-colors hover:bg-slate-100"
            >
              <ShoppingCart
                size={20}
                strokeWidth={1.8}
              />

              <span className="absolute right-0 top-0 flex h-4 min-w-4 translate-x-[10%] -translate-y-[5%] items-center justify-center rounded-full bg-[#17365f] px-1 text-[9px] font-bold leading-none text-white sm:h-[18px] sm:min-w-[18px] sm:translate-x-[15%] sm:text-[10px]">
                {displayedCartCount}
              </span>
            </Link>

            <button
              type="button"
              onClick={() =>
                setIsMenuOpen(
                  (current) => !current,
                )
              }
              aria-label={
                isMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isMenuOpen}
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
          </div>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="border-b border-[#E5E7EB] bg-white px-4 py-3 shadow-lg md:hidden">
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex flex-col"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="rounded-md px-3 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-[#17365f]"
              >
                {item.label}
              </Link>
            ))}

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