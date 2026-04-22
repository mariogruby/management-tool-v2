"use client";

import { useEffect } from "react";
import { useBoardsStore } from "@/store/useBoardsStore";
import { BoardsStoreInitializerProps } from "./BoardStoreInitializer.types";

export function BoardsStoreInitializer({
  boards,
  ownUserId,
}: BoardsStoreInitializerProps) {
  useEffect(() => {
    useBoardsStore.getState().setBoards(boards, ownUserId);
  }, [boards, ownUserId]);

  return null;
}
