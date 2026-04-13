import { create } from "zustand";
import type { BoardModel } from "@/lib/generated/prisma/models/Board";

type BoardsState = {
  boards: BoardModel[];
  ownUserId: string | null;
  setBoards: (boards: BoardModel[], ownUserId: string) => void;
  addBoard: (board: BoardModel) => void;
  removeBoard: (boardId: string) => void;
  renameBoard: (boardId: string, title: string) => void;
};

export const useBoardsStore = create<BoardsState>((set) => ({
  boards: [],
  ownUserId: null,
  setBoards: (boards, ownUserId) => set({ boards, ownUserId }),
  addBoard: (board) => set((state) => ({ boards: [board, ...state.boards] })),
  removeBoard: (boardId) =>
    set((state) => ({ boards: state.boards.filter((b) => b.id !== boardId) })),
  renameBoard: (boardId, title) =>
    set((state) => ({
      boards: state.boards.map((b) => (b.id === boardId ? { ...b, title } : b)),
    })),
}));
