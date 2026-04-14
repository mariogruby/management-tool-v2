export interface AssignedTask {
  id: string;
  title: string;
  completed: boolean;
  priority: string | null;
  dueDate: Date | null;
  list: {
    title: string;
    board: { id: string; title: string };
  };
}

export interface AssignedToMeProps {
  tasks: AssignedTask[];
}
