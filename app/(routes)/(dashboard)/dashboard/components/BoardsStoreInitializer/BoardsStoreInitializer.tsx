"use client";

import { useEffect } from "react";
import type { BoardModel } from "@/lib/generated/prisma/models/Board";
import { useBoardsStore } from "@/store/useBoardsStore";

type BoardsStoreInitializerProps = {
  boards: BoardModel[];
};

export function BoardsStoreInitializer({ boards }: BoardsStoreInitializerProps) {
  useEffect(() => {
    useBoardsStore.setState({ boards });
  }, [boards]);

  return null;
}
