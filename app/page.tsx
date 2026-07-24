import { Suspense } from "react";
import Navbar from "@/components/layout/navbar";
import Hero from "@/components/layout/hero";
import Newsletter from "@/components/layout/newsletter";
import Footer from "@/components/layout/footer";
import ProductGrid from "@/components/product/product-grid";
import ProductCardSkeleton from "@/components/product/product-card-skeleton";

function ProductGridFallback() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({
        length: 6,
      }).map((_, index) => (
        <ProductCardSkeleton
          key={index}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />

      <Hero />

      <main
        id="products"
        className="bg-white"
      >
        <div className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-8 sm:py-12 lg:px-16">
          <Suspense
            fallback={
              <ProductGridFallback />
            }
          >
            <ProductGrid />
          </Suspense>
        </div>
      </main>

      <Newsletter />

      <Footer />
    </>
  );
}