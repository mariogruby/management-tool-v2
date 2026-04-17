export interface BoardWithStats {
  id: string;
  title: string;
  color: string | null;
  updatedAt: Date;
  isOwner: boolean;
  totalTasks: number;
  completedTasks: number;
  totalLists: number;
}

export interface BoardCardProps {
  board: BoardWithStats;
}
