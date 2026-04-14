export interface Board {
  id: string;
  title: string;
  color: string | null;
}

export interface RecentBoardsProps {
  boards: Board[];
}
