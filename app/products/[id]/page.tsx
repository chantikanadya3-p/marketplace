import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  PackageCheck,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import AddToCartButton from "@/components/product/add-to-cart-button";
import { getProductById } from "@/lib/api/products";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    notFound();
  }

  let product;

  try {
    product = await getProductById(productId);
  } catch {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-8 sm:py-12 lg:px-16">
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#17365f]"
        >
          <ArrowLeft size={18} />
          Back to products
        </Link>

        <section className="mt-7 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 sm:min-h-[520px] sm:p-12">
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-10 sm:p-16"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#17365f]">
              {product.category}
            </p>

            <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              {product.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 text-amber-400">
                <Star size={19} fill="currentColor" />
                <span className="font-semibold text-slate-800">
                  {product.rating.rate}
                </span>
              </div>

              <span className="text-sm text-slate-400">
                {product.rating.count} customer reviews
              </span>
            </div>

            <p className="mt-6 text-3xl font-bold text-[#17365f]">
              {formatPrice(product.price)}
            </p>

            <div className="my-7 border-t border-slate-200" />

            <h2 className="text-base font-semibold text-slate-900">
              Product description
            </h2>

            <p className="mt-3 text-base leading-7 text-slate-600">
              {product.description}
            </p>

            <div className="mt-8">
              <AddToCartButton product={product} />
            </div>

            <div className="mt-8 grid gap-3 border-t border-slate-200 pt-7 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <Truck
                  size={22}
                  className="shrink-0 text-[#17365f]"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Fast delivery
                  </p>
                  <p className="text-xs text-slate-500">
                    Reliable shipping
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck
                  size={22}
                  className="shrink-0 text-[#17365f]"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Secure payment
                  </p>
                  <p className="text-xs text-slate-500">
                    Protected checkout
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <PackageCheck
                  size={22}
                  className="shrink-0 text-[#17365f]"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Easy returns
                  </p>
                  <p className="text-xs text-slate-500">
                    Simple return policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}