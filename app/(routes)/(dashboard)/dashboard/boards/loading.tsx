import { BoardListSkeleton } from "@/components/skeletons";

export default function BoardsLoading() {
  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <div className="h-8 w-64 animate-pulse rounded-xl bg-muted" />
        <div className="h-9 w-32 animate-pulse rounded-xl bg-muted" />
      </div>
      <BoardListSkeleton count={8} />
    </div>
  );
}
