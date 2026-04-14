export interface DashboardStatsProps {
  totalPending: number;
  overdue: number;
  completedThisWeek: number;
  totalBoards: number;
}

export interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  variant?: "default" | "danger" | "success" | "muted";
}
