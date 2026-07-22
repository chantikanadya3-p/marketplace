export default function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="h-64 animate-pulse bg-slate-200" />

      <div className="space-y-4 p-5">
        <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />

        <div className="space-y-2">
          <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="border-t border-slate-200 pt-4">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
              <div className="h-6 w-24 animate-pulse rounded bg-slate-200" />
            </div>

            <div className="h-9 w-24 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}