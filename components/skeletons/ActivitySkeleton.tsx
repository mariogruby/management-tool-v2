import { Skeleton } from "@/components/ui/skeleton";

export function ActivitySkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="flex flex-col divide-y">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-start gap-3 px-3 py-3">
          <Skeleton className="h-6 w-6 rounded-full shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <Skeleton className="h-3.5 rounded-md" style={{ width: `${60 + (i % 3) * 12}%` }} />
            <Skeleton className="h-2.5 w-20 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
