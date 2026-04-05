export type TaskDatePickerProps = {
  taskId: string;
  listId: string;
  startDate: Date | null;
  dueDate: Date | null;
  hideTrigger?: boolean;
  onSaved?: (startDate: Date | null, dueDate: Date | null) => void;
};
