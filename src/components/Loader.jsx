export function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/60 dark:border-ink-800/60 bg-white/70 dark:bg-ink-900/60 backdrop-blur-xl shadow-card">
      <div className="aspect-[4/3] bg-ink-100 dark:bg-ink-800 relative overflow-hidden">
        <div className="absolute inset-0 shimmer" />
      </div>
      <div className="p-5 space-y-3">
        <div className="h-4 w-3/4 rounded-full bg-ink-100 dark:bg-ink-800 relative overflow-hidden">
          <div className="absolute inset-0 shimmer" />
        </div>
        <div className="h-4 w-1/2 rounded-full bg-ink-100 dark:bg-ink-800 relative overflow-hidden">
          <div className="absolute inset-0 shimmer" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="h-3 w-20 rounded-full bg-ink-100 dark:bg-ink-800" />
          <div className="h-8 w-8 rounded-full bg-ink-100 dark:bg-ink-800" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function ModalSkeleton() {
  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="aspect-[16/9] rounded-2xl bg-ink-100 dark:bg-ink-800 relative overflow-hidden">
        <div className="absolute inset-0 shimmer" />
      </div>
      <div className="space-y-3">
        <div className="h-6 w-2/3 rounded-full bg-ink-100 dark:bg-ink-800 relative overflow-hidden">
          <div className="absolute inset-0 shimmer" />
        </div>
        <div className="h-4 w-1/3 rounded-full bg-ink-100 dark:bg-ink-800" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 w-full rounded-full bg-ink-100 dark:bg-ink-800" />
          ))}
        </div>
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 w-11/12 rounded-full bg-ink-100 dark:bg-ink-800" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkeletonGrid;
