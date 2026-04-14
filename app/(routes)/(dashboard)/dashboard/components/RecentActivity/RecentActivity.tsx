import Link from "next/link";
import { Activity } from "lucide-react";
import { RecentActivityProps } from "./RecentActivity.types";
import { TYPE_ICON } from "./RecentActivity.constants";

function timeAgo(date: Date): string {
  const diffMs = Date.now() - new Date(date).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "ahora";
  if (diffMin < 60) return `hace ${diffMin}min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `hace ${diffH}h`;
  const diffD = Math.floor(diffH / 24);
  if (diffD === 1) return "ayer";
  if (diffD < 7) return `hace ${diffD}d`;
  return new Date(date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  });
}

export function RecentActivity({ logs }: RecentActivityProps) {
  if (logs.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Actividad reciente</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground rounded-xl border p-4">
          <Activity size={16} className="shrink-0" />
          <span>Sin actividad reciente</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">Actividad reciente</h2>
      <div className="flex flex-col divide-y rounded-xl border bg-card overflow-hidden">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-3 px-4 py-3">
            <span className="shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs mt-0.5">
              {TYPE_ICON[log.type] ?? "•"}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm leading-snug">{log.message}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Link
                  href={`/board/${log.board.id}`}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors truncate"
                >
                  {log.board.title}
                </Link>
              </div>
            </div>
            <span className="text-xs text-muted-foreground shrink-0 tabular-nums">
              {timeAgo(log.createdAt)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
