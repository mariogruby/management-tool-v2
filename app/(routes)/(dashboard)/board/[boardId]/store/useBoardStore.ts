import { create } from "zustand";
import { arrayMove } from "@dnd-kit/sortable";
import type { TaskModel } from "@/lib/generated/prisma/models/Task";
import type { ListWithTasks } from "../components/TaskCard/TaskCard.types";

interface BoardState {
  lists: ListWithTasks[];

  // Inicializar con datos del servidor
  setLists: (lists: ListWithTasks[]) => void;

  // Crear
  addList: (list: ListWithTasks) => void;
  addTask: (listId: string, task: TaskModel) => void;

  // Reordenar (DND)
  reorderLists: (oldIndex: number, newIndex: number) => void;
  moveTask: (
    activeId: string,
    activeListId: string,
    overListId: string,
    overIndex: number
  ) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  lists: [],

  setLists: (lists) => set({ lists }),

  addList: (list) =>
    set((state) => ({ lists: [...state.lists, list] })),

  addTask: (listId, task) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === listId
          ? { ...list, tasks: [...list.tasks, task] }
          : list
      ),
    })),

  reorderLists: (oldIndex, newIndex) =>
    set((state) => ({
      lists: arrayMove(state.lists, oldIndex, newIndex),
    })),

  moveTask: (activeId, activeListId, overListId, overIndex) =>
    set((state) => {
      const next = state.lists.map((l) => ({ ...l, tasks: [...l.tasks] }));
      const sourceList = next.find((l) => l.id === activeListId);
      const targetList = next.find((l) => l.id === overListId);

      if (!sourceList || !targetList) return state;

      const activeIdx = sourceList.tasks.findIndex((t) => t.id === activeId);
      if (activeIdx === -1) return state;

      if (activeListId === overListId) {
        sourceList.tasks = arrayMove(sourceList.tasks, activeIdx, overIndex);
      } else {
        const [moved] = sourceList.tasks.splice(activeIdx, 1);
        targetList.tasks.splice(overIndex, 0, { ...moved, listId: overListId });
      }

      return { lists: next };
    }),
}));
