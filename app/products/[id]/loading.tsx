export default function ProductDetailLoading() {
  return (
    <main className="mx-auto w-full max-w-[1440px] animate-pulse px-4 py-8 sm:px-8 sm:py-12 lg:px-16">
      <div className="h-5 w-36 rounded bg-slate-200" />

      <div className="mt-7 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="min-h-[360px] rounded-2xl bg-slate-200 sm:min-h-[520px]" />

        <div className="flex flex-col justify-center">
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="mt-4 h-10 w-full rounded bg-slate-200" />
          <div className="mt-3 h-10 w-3/4 rounded bg-slate-200" />
          <div className="mt-6 h-5 w-44 rounded bg-slate-200" />
          <div className="mt-6 h-9 w-32 rounded bg-slate-200" />

          <div className="mt-8 space-y-3 border-t border-slate-200 pt-7">
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-4/5 rounded bg-slate-200" />
          </div>

          <div className="mt-8 h-12 w-full rounded bg-slate-200 sm:w-40" />
        </div>
      </div>
    </main>
  );
}