import type { TaskModel } from "@/lib/generated/prisma/models/Task";

export type TaskModalProps = {
  task: TaskModel;
  listId: string;
  listTitle: string;
  open: boolean;
  onClose: () => void;
};
