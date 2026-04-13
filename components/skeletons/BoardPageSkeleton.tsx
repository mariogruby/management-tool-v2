import { Skeleton } from "@/components/ui/skeleton";

function ListSkeleton() {
  return (
    <div className="flex flex-col bg-muted rounded-xl w-64 shrink-0 p-3 gap-2">
      <Skeleton className="h-5 w-32 rounded-md" />
      <div className="flex flex-col gap-2 mt-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export function BoardPageSkeleton() {
  return (
    <div className="flex flex-col h-full p-6 gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-7 w-48 rounded-md" />
        <Skeleton className="h-7 w-7 rounded-md ml-auto" />
        <Skeleton className="h-7 w-7 rounded-md" />
      </div>
      {/* Kanban columns */}
      <div className="flex gap-4 overflow-hidden">
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
      </div>
    </div>
  );
}
