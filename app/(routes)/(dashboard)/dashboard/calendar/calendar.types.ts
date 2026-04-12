export type CalendarTask = {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  list: {
    title: string;
    boardId: string;
    board: { id: string; title: string; color: string | null };
  };
};
