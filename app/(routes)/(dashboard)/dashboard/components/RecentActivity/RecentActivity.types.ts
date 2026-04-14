interface ActivityEntry {
  id: string;
  type: string;
  message: string;
  createdAt: Date;
  board: { id: string; title: string };
  user: { name: string | null };
}

export interface RecentActivityProps {
  logs: ActivityEntry[];
}
