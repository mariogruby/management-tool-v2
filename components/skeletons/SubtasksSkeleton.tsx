import { Skeleton } from "@/components/ui/skeleton";

export function SubtasksSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 px-2 py-1">
          <Skeleton className="h-4 w-4 rounded shrink-0" />
          <Skeleton className="h-3.5 rounded-md" style={{ width: `${55 + (i % 3) * 15}%` }} />
        </div>
      ))}
    </div>
  );
}
