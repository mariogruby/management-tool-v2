import { TaskCardProps } from "./TaskCard.types";

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-background rounded-lg px-3 py-2 shadow-sm border text-sm cursor-pointer hover:border-primary/50 transition-colors">
      {task.title}
    </div>
  );
}
