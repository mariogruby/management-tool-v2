import type { BoardLink } from "@/app/api/boards/[boardId]/links/route";

export interface BoardLinksProps {
  boardId: string;
  isOwner: boolean;
  initialLinks: BoardLink[];
}
