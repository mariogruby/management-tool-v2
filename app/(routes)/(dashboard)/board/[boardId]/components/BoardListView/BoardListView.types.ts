import type {
  ListWithTasks,
  TaskWithLabels,
  BoardUser,
} from "../TaskCard/TaskCard.types";

export interface BoardListViewProps {
  lists: ListWithTasks[];
  boardId: string;
  isOwner: boolean;
  boardUsers: BoardUser[];
}

export interface TaskRowProps {
  task: TaskWithLabels;
  listId: string;
  listTitle: string;
  boardId: string;
  isOwner: boolean;
  boardUsers: BoardUser[];
}
