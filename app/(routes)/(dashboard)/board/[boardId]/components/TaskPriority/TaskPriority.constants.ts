export type Priority = "urgent" | "high" | "medium" | "low";

export interface TaskPriorityProps {
  taskId: string;
  priority: string | null;
  onSaved: (priority: Priority | null) => void;
}

export const PRIORITIES: {
  value: Priority;
  label: string;
  color: string;
  bg: string;
}[] = [
  {
    value: "urgent",
    label: "Urgente",
    color: "#ef4444",
    bg: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  {
    value: "high",
    label: "Alta",
    color: "#f97316",
    bg: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  },
  {
    value: "medium",
    label: "Media",
    color: "#eab308",
    bg: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  {
    value: "low",
    label: "Baja",
    color: "#22c55e",
    bg: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
];

export function getPriority(value: string | null | undefined) {
  return PRIORITIES.find((p) => p.value === value) ?? null;
}
