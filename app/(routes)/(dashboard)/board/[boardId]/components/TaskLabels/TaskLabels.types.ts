import type { LabelModel } from "@/lib/generated/prisma/models/Label";

export type TaskLabelsProps = {
  taskId: string;
  boardId: string;
  activeLabels: { label: LabelModel }[];
  onLabelsChange?: (active: { label: LabelModel }[]) => void;
};
