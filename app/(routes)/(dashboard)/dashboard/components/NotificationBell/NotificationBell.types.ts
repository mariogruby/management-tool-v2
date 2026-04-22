export type Notification = {
  id: string;
  type: string;
  message: string;
  read: boolean;
  boardId: string | null;
  taskId: string | null;
  createdAt: string;
};
