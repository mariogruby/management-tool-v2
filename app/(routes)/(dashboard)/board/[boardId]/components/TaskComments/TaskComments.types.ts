export type CommentItem = {
  id: string;
  content: string;
  createdAt: string;
  user: { name: string | null; email: string };
};

export type TaskCommentsProps = {
  taskId: string;
};
