import { Skeleton } from "@/components/ui/skeleton";

export function AttachmentsSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 px-2 py-1.5">
          <Skeleton className="h-4 w-4 rounded shrink-0" />
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <Skeleton className="h-3 rounded-md" style={{ width: `${50 + (i % 2) * 20}%` }} />
            <Skeleton className="h-2.5 w-12 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
