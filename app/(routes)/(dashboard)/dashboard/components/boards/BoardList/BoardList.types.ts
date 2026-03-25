import { BoardModel } from "@/lib/generated/prisma/models/Board";

export type BoardListProps = {
  boards: BoardModel[];
};
