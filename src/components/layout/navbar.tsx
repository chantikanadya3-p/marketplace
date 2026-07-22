"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
import { useAppSelector } from "@/hooks/redux";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Inventory", href: "/#products" },
  { label: "Financing", href: "/#financing" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white">
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:h-[72px] sm:px-8 lg:px-16">
        <div className="flex items-center gap-12">
          <Link
            href="/"
            onClick={closeMenu}
            className="text-xl font-bold tracking-tight text-[#17365f] sm:text-2xl"
          >
            TJERMIN
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navigationItems.map((item, index) => (
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
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-[#17365f] sm:gap-5">
          <button
            type="button"
            aria-label="Search products"
            className="transition-transform hover:scale-110"
          >
            <Search size={20} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            aria-label="User account"
            className="hidden transition-transform hover:scale-110 sm:block"
          >
            <UserRound size={20} strokeWidth={1.8} />
          </button>

          <Link
            href="/cart"
            aria-label={`Shopping cart with ${totalItems} items`}
            className="relative transition-transform hover:scale-110"
          >
            <ShoppingCart size={22} strokeWidth={1.8} />

            {totalItems > 0 && (
              <span className="absolute -right-2.5 -top-2.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#17365f] px-1 text-[10px] font-semibold text-white">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-slate-100 md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 shadow-lg md:hidden">
          <div className="mx-auto flex max-w-[1440px] flex-col">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="rounded-md px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-[#17365f]"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/account"
              onClick={closeMenu}
              className="mt-2 flex items-center gap-3 border-t border-slate-100 px-3 pt-4 text-sm font-medium text-slate-700"
            >
              <UserRound size={19} />
              Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}