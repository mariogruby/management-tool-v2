interface UpcomingTask {
  id: string;
  title: string;
  completed: boolean;
  dueDate: Date | null;
  priority: string | null;
  list: {
    title: string;
    board: { id: string; title: string };
  };
}

export interface UpcomingTasksProps {
  tasks: UpcomingTask[];
}
