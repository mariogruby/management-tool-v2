import type { ListModel } from "@/lib/generated/prisma/models/List";
import type { TaskModel } from "@/lib/generated/prisma/models/Task";
import type { LabelModel } from "@/lib/generated/prisma/models/Label";

export type TaskWithLabels = TaskModel & { labels: { label: LabelModel }[] };

export type ListWithTasks = ListModel & { tasks: TaskWithLabels[] };

export type TaskCardProps = {
  task: TaskWithLabels;
  listId: string;
  listTitle: string;
  boardId: string;
}
