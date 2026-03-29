import { create } from "zustand";
import type { BoardModel } from "@/lib/generated/prisma/models/Board";

type BoardsState = {
  boards: BoardModel[];
  setBoards: (boards: BoardModel[]) => void;
  addBoard: (board: BoardModel) => void;
};

export const useBoardsStore = create<BoardsState>((set) => ({
  boards: [],
  setBoards: (boards) => set({ boards }),
  addBoard: (board) => set((state) => ({ boards: [board, ...state.boards] })),
}));
