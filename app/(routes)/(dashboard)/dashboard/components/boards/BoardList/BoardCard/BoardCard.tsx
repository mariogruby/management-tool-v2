import Link from "next/link";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BoardCardProps } from "./BoardCard.types";

function timeAgo(date: Date): string {
  const diffMs = Date.now() - new Date(date).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 60) return "hace poco";
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `hace ${diffH}h`;
  const diffD = Math.floor(diffH / 24);
  if (diffD === 1) return "ayer";
  if (diffD < 7) return `hace ${diffD}d`;
  return new Date(date).toLocaleDateString("es-ES", { day: "numeric", month: "short" });
}

export function BoardCard({ board }: BoardCardProps) {
  const { id, title, color, updatedAt, isOwner, totalTasks, completedTasks, totalLists } = board;
  const pct = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  const initial = title.charAt(0).toUpperCase();

  const hasColor = !!color;
  const textColor = hasColor ? "text-white" : "text-foreground";
  const mutedTextColor = hasColor ? "text-white/70" : "text-muted-foreground";

  return (
    <Link href={`/board/${id}`} className="group block">
      <div
        className="relative flex flex-col rounded-xl border overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
        style={hasColor ? { backgroundColor: color! } : undefined}
      >
        {/* Header */}
        <div className={`flex items-start justify-between p-4 pb-3 ${!hasColor ? "bg-muted/40" : ""}`}>
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center text-base font-bold shrink-0 ${
              hasColor ? "bg-white/20 text-white" : "bg-background text-foreground"
            }`}
          >
            {initial}
          </div>
          {!isOwner && (
            <Badge
              variant="secondary"
              className={`text-[10px] px-1.5 py-0 h-5 shrink-0 ${hasColor ? "bg-white/20 text-white border-0" : ""}`}
            >
              <Users size={9} className="mr-1" />
              Miembro
            </Badge>
          )}
        </div>

        {/* Title + meta */}
        <div className="px-4 pb-3 flex flex-col gap-1">
          <h3 className={`font-semibold text-sm leading-tight line-clamp-2 ${textColor}`}>
            {title}
          </h3>
          <p className={`text-xs ${mutedTextColor}`}>
            {totalLists} lista{totalLists !== 1 ? "s" : ""} · {totalTasks} tarea{totalTasks !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Progress bar */}
        <div className="px-4 pb-4 flex flex-col gap-1.5 mt-auto">
          <div className={`w-full h-1.5 rounded-full overflow-hidden ${hasColor ? "bg-white/25" : "bg-muted"}`}>
            <div
              className={`h-full rounded-full transition-all ${hasColor ? "bg-white" : "bg-primary"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className={`flex items-center justify-between text-[10px] ${mutedTextColor}`}>
            <span>{completedTasks}/{totalTasks} completadas</span>
            <span>{timeAgo(updatedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
