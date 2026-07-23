import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import AddToCartButton from "@/components/product/add-to-cart-button";
import ProductCard from "@/components/product/product-card";
import productData from "@/data/products.json";
import type { Product } from "@/types/product";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const products = productData as Product[];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function getRelatedProducts(
  currentProduct: Product,
): Product[] {
  const sameCategory = products.filter(
    (product) =>
      product.id !== currentProduct.id &&
      product.category ===
        currentProduct.category,
  );

  const otherProducts = products.filter(
    (product) =>
      product.id !== currentProduct.id &&
      product.category !==
        currentProduct.category,
  );

  return [
    ...sameCategory,
    ...otherProducts,
  ].slice(0, 4);
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (
    !Number.isInteger(productId) ||
    productId <= 0
  ) {
    notFound();
  }

  const product = products.find(
    (item) => item.id === productId,
  );

  if (!product) {
    notFound();
  }

  const relatedProducts =
    getRelatedProducts(product);

  return (
    <>
      <Navbar />

      <main className="bg-white">
        <div className="mx-auto w-full max-w-[1120px] px-4 py-5 sm:px-8 sm:py-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex flex-wrap items-center gap-2 text-[11px] text-slate-500"
          >
            <Link
              href="/"
              className="hover:text-[#17365f]"
            >
              Home
            </Link>

            <ChevronRight size={11} />

            <Link
              href="/#products"
              className="hover:text-[#17365f]"
            >
              Inventory
            </Link>

            <ChevronRight size={11} />

            <span className="font-medium text-[#17365f]">
              {product.title}
            </span>
          </nav>

          <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain p-10 sm:p-14"
                />

                <button
                  type="button"
                  aria-label="Previous product image"
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#17365f] shadow-md"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  aria-label="Next product image"
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#17365f] shadow-md"
                >
                  <ChevronRight size={18} />
                </button>

                <span className="absolute bottom-3 right-3 rounded-full bg-slate-900/70 px-3 py-1 text-[10px] font-medium text-white">
                  1/1
                </span>
              </div>

              <div className="mt-3 grid grid-cols-4 gap-3">
                <button
                  type="button"
                  className="relative aspect-[4/3] overflow-hidden rounded-lg border-2 border-[#17365f] bg-slate-100"
                >
                  <Image
                    src={product.image}
                    alt={`${product.title} thumbnail`}
                    fill
                    sizes="160px"
                    className="object-contain p-3"
                  />
                </button>
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                {product.title}
              </h1>

              <p className="mt-4 text-sm font-normal leading-[22.75px] tracking-[-0.15px] text-[#64748B]">
                {product.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <p className="text-2xl font-bold text-[#17365f] sm:text-3xl">
                  {formatPrice(product.price)}
                </p>

                <p className="text-sm text-slate-400 line-through">
                  {formatPrice(
                    product.price * 1.2,
                  )}
                </p>
              </div>

              <div className="mt-6">
                <h2 className="text-xs font-semibold text-slate-900">
                  Details
                </h2>

                <p className="mt-2 text-sm font-normal leading-5 tracking-[-0.15px] text-[#64748B]">
                  Premium quality • Unisex • Imported
                </p>
              </div>

              <div className="mt-5">
                <h2 className="text-xs font-semibold text-slate-900">
                  Category
                </h2>

                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-md border border-slate-300 bg-slate-50 px-3 py-1.5 text-[11px] font-medium capitalize text-[#17365f]">
                    {product.category}
                  </span>

                  {product.rating.rate >= 4 && (
                    <span className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-medium text-emerald-600">
                      Best Seller
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <div className="flex h-11 shrink-0 overflow-hidden rounded-md border border-slate-200">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    className="flex w-10 items-center justify-center text-slate-500 hover:bg-slate-50"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="flex w-10 items-center justify-center border-x border-slate-200 text-sm font-medium text-slate-800">
                    1
                  </span>

                  <button
                    type="button"
                    aria-label="Increase quantity"
                    className="flex w-10 items-center justify-center text-slate-500 hover:bg-slate-50"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-md border border-slate-300 text-xs font-medium text-[#17365f] hover:bg-slate-50"
                >
                  <Heart
                    size={15}
                    strokeWidth={1.8}
                  />
                  Wishlist
                </button>
              </div>

              <div className="mt-3">
                <AddToCartButton product={product} />
              </div>

              <dl className="mt-7 space-y-3 border-t border-slate-200 pt-5 text-xs">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-slate-500">
                    SKU:
                  </dt>

                  <dd className="font-medium text-slate-800">
                    BT-{String(product.id).padStart(
                      3,
                      "0",
                    )}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <dt className="text-slate-500">
                    Material:
                  </dt>

                  <dd className="text-right font-medium text-slate-800">
                    Premium Quality Material
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <dt className="text-slate-500">
                    Stock:
                  </dt>

                  <dd className="font-medium text-slate-800">
                    In Stock ({product.rating.count})
                  </dd>
                </div>
              </dl>

              <div className="mt-6 border-t border-slate-200">
                <button
                  type="button"
                  className="flex w-full items-center justify-between border-b border-slate-200 py-4 text-xs font-medium text-slate-800"
                >
                  Additional Info
                  <ChevronRight size={14} />
                </button>

              <button
                type="button"
                className="flex w-full items-center justify-between border-b border-slate-200 py-4 text-xs font-medium text-slate-800"
              >
                Details
                <ChevronRight
                  size={14}
                />
              </button>
              </div>
            </div>
          </section>

          {relatedProducts.length > 0 && (
            <section className="mt-16 sm:mt-20">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">
                  You might also like
                </h2>

                <Link
                  href="/#products"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#17365f] hover:underline"
                >
                  More Products
                  <ChevronRight size={13} />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map(
                  (relatedProduct, index) => (
                    <ProductCard
                      key={relatedProduct.id}
                      product={relatedProduct}
                      index={index}
                    />
                  ),
                )}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}