import Hero from "@/components/layout/hero";
import Navbar from "@/components/layout/navbar";
import ProductGrid from "@/components/product/product-grid";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden">
        <Hero />

        <section
          id="products"
          className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-8 sm:py-14 lg:px-16 lg:py-16"
        >
          <div className="mb-7 sm:mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#17365f] sm:text-sm">
              Marketplace
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Our Products
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Discover products from our premium selection.
            </p>
          </div>

          <ProductGrid />
        </section>
      </main>
    </>
  );
}