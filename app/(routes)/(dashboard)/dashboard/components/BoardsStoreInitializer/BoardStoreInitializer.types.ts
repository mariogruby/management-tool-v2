import type { BoardModel } from "@/lib/generated/prisma/models/Board";

export type BoardsStoreInitializerProps = {
  boards: BoardModel[];
  ownUserId: string;
};