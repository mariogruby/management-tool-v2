export type ActivityLog = {
  id: string;
  type: string;
  message: string;
  createdAt: string;
};

export interface BoardActivityProps {
  boardId: string;
  open: boolean;
  onClose: () => void;
}
