import Link from "next/link";
import { cn } from "@/lib/utils";
import { BoardCardProps } from "./BoardCard.types";

export function BoardCard({ board }: BoardCardProps) {
  return (
    <Link href={`/board/${board.id}`}>
      <div
        className={cn(
          "flex items-center justify-center rounded-lg p-4 h-24 font-medium hover:opacity-80 transition-opacity cursor-pointer",
          !board.color && "bg-muted"
        )}
        style={board.color ? { backgroundColor: board.color, color: "#fff" } : undefined}
      >
        {board.title}
      </div>
    </Link>
  );
}
