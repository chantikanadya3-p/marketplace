export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[220px] items-center justify-center overflow-hidden bg-[#17365f] sm:min-h-[360px] lg:min-h-[420px]">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[url('/images/marketplace-hero.jpg')] bg-cover bg-center bg-no-repeat"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#1E3A5F_0%,#244773_25%,#2D5A8F_50%,#244773_75%,#1E3A5F_100%)] opacity-[0.85]"
      />

      <div className="mx-auto w-full max-w-4xl px-5 py-12 text-center text-white sm:px-8 sm:py-16">
        <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          Tjermin Marketplace
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-xs leading-5 text-white/90 sm:mt-4 sm:text-lg sm:leading-6">
          Find your perfect things from our
          premium selection.
        </p>
      </div>
    </section>
  );
}