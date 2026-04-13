import { Skeleton } from "@/components/ui/skeleton";

export function SearchResultsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-1 px-2 py-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 px-2 py-2 rounded-md">
          <Skeleton className="h-4 w-4 rounded shrink-0" />
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <Skeleton className="h-3.5 rounded-md" style={{ width: `${45 + (i % 3) * 15}%` }} />
            {i % 2 === 0 && <Skeleton className="h-2.5 w-24 rounded-md" />}
          </div>
        </div>
      ))}
    </div>
  );
}
