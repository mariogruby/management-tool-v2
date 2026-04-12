 export type Subtask = {
  id: string;
  title: string;
  completed: boolean;
  order: number;
};

export interface TaskSubtasksProps {
  taskId: string;
}