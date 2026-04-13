"use client";

import { useEffect } from "react";
import type { BoardModel } from "@/lib/generated/prisma/models/Board";
import { useBoardsStore } from "@/store/useBoardsStore";

type BoardsStoreInitializerProps = {
  boards: BoardModel[];
  ownUserId: string;
};

export function BoardsStoreInitializer({ boards, ownUserId }: BoardsStoreInitializerProps) {
  useEffect(() => {
    useBoardsStore.getState().setBoards(boards, ownUserId);
  }, [boards, ownUserId]);

  return null;
}
