export type SearchBoard = {
  id: string;
  title: string;
  color: string | null;
};

export type SearchTask = {
  id: string;
  title: string;
  completed: boolean;
  list: {
    title: string;
    boardId: string;
    board: { title: string };
  };
};

export type SearchResults = {
  boards: SearchBoard[];
  tasks: SearchTask[];
};
