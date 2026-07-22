import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[360px] items-center justify-center overflow-hidden bg-[#17365f] sm:min-h-[420px] lg:min-h-[460px]">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=85')] bg-cover bg-center"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[#17365f]/80"
      />

      <div className="mx-auto w-full max-w-4xl px-5 py-16 text-center text-white sm:px-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Tjermin Marketplace
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/90 sm:text-lg lg:text-xl">
          Find your perfect things from our premium selection.
        </p>

        <Link
          href="/#products"
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-md border border-white px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#17365f] sm:mt-8 sm:px-6 sm:py-3"
        >
          Explore Products
        </Link>
      </div>
    </section>
  );
}