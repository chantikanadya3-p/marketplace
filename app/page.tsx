import Hero from "@/components/layout/hero";
import Navbar from "@/components/layout/navbar";
import ProductGrid from "@/components/product/product-grid";
import Footer from "@/components/layout/footer";
import Newsletter from "@/components/layout/newsletter";

export default function Home() {
  return (
  <>
    <Navbar />

    <main className="overflow-x-hidden">
      <Hero />

      <section
  id="products"
  className="mx-auto w-full max-w-[1440px] px-4 py-4 sm:px-8 sm:py-8 lg:px-16 lg:py-12"
>
  <ProductGrid />
</section>

      <Newsletter />
    </main>

    <Footer />
  </>
);
}