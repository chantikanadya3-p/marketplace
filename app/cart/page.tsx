"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/features/cart/cart-slice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/hooks/redux";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export default function CartPage() {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(
    (state) => state.cart.items,
  );

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0,
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      item.product.price * item.quantity,
    0,
  );

  return (
    <>
      <Navbar />

      <main className="min-h-[65vh] bg-[#F8FAFC]">
        <div className="mx-auto w-full max-w-[1120px] px-4 py-8 sm:px-8 sm:py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#17365f]">
                Shopping Cart
              </p>

              <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                Your Cart
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                {totalItems}{" "}
                {totalItems === 1
                  ? "item"
                  : "items"}{" "}
                in your cart
              </p>
            </div>

            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={() =>
                  dispatch(clearCart())
                }
                className="text-sm font-medium text-red-500 transition-colors hover:text-red-700"
              >
                Clear cart
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <motion.section
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mt-8 flex min-h-96 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-5 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-[#17365f]">
                <ShoppingBag size={30} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                Your cart is empty
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Browse our products and add your
                favorite items to the cart.
              </p>

              <Link
                href="/#products"
                className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#17365f] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#102947]"
              >
                <ArrowLeft size={16} />
                Continue Shopping
              </Link>
            </motion.section>
          ) : (
            <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
              <div className="space-y-4">
                {cartItems.map(
                  (item, index) => (
                    <motion.article
                      key={item.product.id}
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: Math.min(
                          index * 0.05,
                          0.2,
                        ),
                      }}
                      className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[120px_minmax(0,1fr)_auto] sm:items-center"
                    >
                      <Link
                        href={`/products/${item.product.id}`}
                        className="relative aspect-square overflow-hidden rounded-lg bg-slate-50"
                      >
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          fill
                          sizes="120px"
                          className="object-contain p-3"
                        />
                      </Link>

                      <div className="min-w-0">
                        <Link
                          href={`/products/${item.product.id}`}
                        >
                          <h2 className="line-clamp-2 text-sm font-semibold text-slate-900 transition-colors hover:text-[#17365f] sm:text-base">
                            {item.product.title}
                          </h2>
                        </Link>

                        <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                          {item.product.category}
                        </p>

                        <p className="mt-3 text-base font-bold text-[#17365f]">
                          {formatPrice(
                            item.product.price,
                          )}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              removeFromCart(
                                item.product.id,
                              ),
                            )
                          }
                          className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-red-500 transition-colors hover:text-red-700 sm:hidden"
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>

                      <div className="col-span-2 flex items-center justify-between border-t border-slate-100 pt-4 sm:col-span-1 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                        <div className="flex h-10 overflow-hidden rounded-md border border-slate-200">
                          <motion.button
                            type="button"
                            whileTap={{
                              scale: 0.88,
                            }}
                            onClick={() =>
                              dispatch(
                                decreaseQuantity(
                                  item.product.id,
                                ),
                              )
                            }
                            aria-label="Decrease quantity"
                            className="flex w-10 items-center justify-center text-slate-500 transition-colors hover:bg-slate-50"
                          >
                            <Minus size={14} />
                          </motion.button>

                          <span className="flex w-10 items-center justify-center border-x border-slate-200 text-sm font-semibold text-slate-800">
                            {item.quantity}
                          </span>

                          <motion.button
                            type="button"
                            whileTap={{
                              scale: 0.88,
                            }}
                            onClick={() =>
                              dispatch(
                                increaseQuantity(
                                  item.product.id,
                                ),
                              )
                            }
                            aria-label="Increase quantity"
                            className="flex w-10 items-center justify-center text-slate-500 transition-colors hover:bg-slate-50"
                          >
                            <Plus size={14} />
                          </motion.button>
                        </div>

                        <p className="font-bold text-slate-900">
                          {formatPrice(
                            item.product.price *
                              item.quantity,
                          )}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              removeFromCart(
                                item.product.id,
                              ),
                            )
                          }
                          className="mt-3 hidden items-center gap-1.5 text-xs font-medium text-red-500 transition-colors hover:text-red-700 sm:inline-flex"
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>
                    </motion.article>
                  ),
                )}
              </div>

              <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-28">
                <h2 className="text-lg font-bold text-slate-900">
                  Order Summary
                </h2>

                <dl className="mt-5 space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-slate-500">
                      Items
                    </dt>

                    <dd className="font-medium text-slate-900">
                      {totalItems}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between">
                    <dt className="text-slate-500">
                      Subtotal
                    </dt>

                    <dd className="font-medium text-slate-900">
                      {formatPrice(subtotal)}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between">
                    <dt className="text-slate-500">
                      Shipping
                    </dt>

                    <dd className="font-medium text-emerald-600">
                      Free
                    </dd>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                    <dt className="font-semibold text-slate-900">
                      Total
                    </dt>

                    <dd className="text-xl font-bold text-[#17365f]">
                      {formatPrice(subtotal)}
                    </dd>
                  </div>
                </dl>

                <motion.button
                  type="button"
                  whileHover={{
                    scale: 1.01,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="mt-6 h-11 w-full rounded-md bg-[#17365f] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#102947]"
                >
                  Proceed to Checkout
                </motion.button>

                <Link
                  href="/#products"
                  className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-[#17365f] hover:underline"
                >
                  <ArrowLeft size={15} />
                  Continue Shopping
                </Link>
              </aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}