import { Skeleton } from "@/components/ui/skeleton";

export function CommentsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-20 rounded-md" />
            <Skeleton className="h-3 w-12 rounded-md ml-auto" />
          </div>
          <Skeleton className="h-9 w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
}
