import type { ListModel } from "@/lib/generated/prisma/models/List";
import type { TaskModel } from "@/lib/generated/prisma/models/Task";

export type ListWithTasks = ListModel & { tasks: TaskModel[] };

export type TaskCardProps = {
  task: TaskModel;
  listId: string;
  listTitle: string;
}
