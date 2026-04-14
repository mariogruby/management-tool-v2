import { TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { GlobalProgressProps } from "./GlobalProgress.types";

export function GlobalProgress({
  totalTasks,
  completedTasks,
  completedThisWeek,
}: GlobalProgressProps) {
  const pct =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="rounded-xl border bg-card p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium">Progreso global</span>
        </div>
        <span className="text-2xl font-bold tabular-nums">{pct}%</span>
      </div>

      <Progress value={pct} className="h-2" />

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {completedTasks} de {totalTasks} tareas completadas
        </span>
        <span className="text-emerald-500 font-medium">
          +{completedThisWeek} esta semana
        </span>
      </div>
    </div>
  );
}
