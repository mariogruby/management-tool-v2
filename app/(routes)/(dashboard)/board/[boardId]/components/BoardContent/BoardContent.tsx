"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { TaskModel } from "@/lib/generated/prisma/models/Task";
import type { ListWithTasks, TaskWithLabels } from "../TaskCard/TaskCard.types";
import { useBoardStore } from "../../store/useBoardStore";
import { ListItem } from "../ListItem/ListItem";
import { CreateListForm } from "../CreateListForm/CreateListForm";
import { BoardContentProps } from "./BoardContent.types";
import { BoardFilters } from "../BoardFilters/BoardFilters";
import { BoardFiltersState } from "../BoardFilters/BoardFilters.types";

const DEFAULT_FILTERS: BoardFiltersState = {
  status: "all",
  dueDate: "all",
  labelIds: [],
};

function taskMatchesFilters(task: TaskWithLabels, filters: BoardFiltersState): boolean {
  // Status
  if (filters.status === "completed" && !task.completed) return false;
  if (filters.status === "pending" && task.completed) return false;

  // Labels — task must have ALL selected labels
  if (filters.labelIds.length > 0) {
    const taskLabelIds = task.labels.map((l) => l.label.id);
    if (!filters.labelIds.every((id) => taskLabelIds.includes(id))) return false;
  }

  // Due date
  if (filters.dueDate !== "all") {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekEnd = new Date(today);
    weekEnd.setDate(today.getDate() + 7);

    if (filters.dueDate === "none") {
      if (task.dueDate) return false;
    } else if (filters.dueDate === "overdue") {
      if (!task.dueDate || new Date(task.dueDate) >= today) return false;
    } else if (filters.dueDate === "today") {
      if (!task.dueDate) return false;
      const due = new Date(task.dueDate);
      const dueDay = new Date(due.getFullYear(), due.getMonth(), due.getDate());
      if (dueDay.getTime() !== today.getTime()) return false;
    } else if (filters.dueDate === "week") {
      if (!task.dueDate) return false;
      const due = new Date(task.dueDate);
      if (due < today || due >= weekEnd) return false;
    }
  }

  return true;
}

export function BoardContent({ lists: initialLists, boardId, isOwner, boardUsers }: BoardContentProps) {
  const { lists, setLists, reorderLists, moveTask } = useBoardStore();
  const [activeTask, setActiveTask] = useState<TaskModel | null>(null);
  const [activeList, setActiveList] = useState<ListWithTasks | null>(null);
  const [filters, setFilters] = useState<BoardFiltersState>(DEFAULT_FILTERS);

  useEffect(() => {
    setLists(initialLists);
  }, [initialLists, setLists]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // Collect all unique labels from all tasks
  const availableLabels = useMemo(() => {
    const map = new Map<string, { id: string; title: string; color: string }>();
    lists.forEach((list) => {
      list.tasks.forEach((task) => {
        task.labels.forEach(({ label }) => {
          if (!map.has(label.id)) {
            map.set(label.id, { id: label.id, title: label.title, color: label.color });
          }
        });
      });
    });
    return Array.from(map.values());
  }, [lists]);

  // Apply filters to lists (keep list structure, just filter tasks)
  const filteredLists = useMemo(() => {
    const isFiltering =
      filters.status !== "all" ||
      filters.dueDate !== "all" ||
      filters.labelIds.length > 0;

    if (!isFiltering) return lists;

    return lists.map((list) => ({
      ...list,
      tasks: list.tasks.filter((task) => taskMatchesFilters(task, filters)),
    }));
  }, [lists, filters]);

  const onDragStart = ({ active }: DragStartEvent) => {
    if (active.data.current?.type === "task")
      setActiveTask(active.data.current.task);
    if (active.data.current?.type === "list")
      setActiveList(active.data.current.list);
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over || active.id === over.id) return;
    if (active.data.current?.type !== "task") return;

    const activeListId = active.data.current?.listId as string;
    const isOverTask = over.data.current?.type === "task";
    const isOverList = over.data.current?.type === "list";

    if (isOverTask) {
      const overListId = over.data.current?.listId as string;
      const targetList = lists.find((l) => l.id === overListId);
      const overIndex = targetList?.tasks.findIndex((t) => t.id === over.id) ?? 0;
      moveTask(active.id as string, activeListId, overListId, overIndex);
    }

    if (isOverList) {
      const overListId = over.id as string;
      if (activeListId === overListId) return;
      const targetList = lists.find((l) => l.id === overListId);
      const overIndex = targetList?.tasks.length ?? 0;
      moveTask(active.id as string, activeListId, overListId, overIndex);
    }
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveTask(null);
    setActiveList(null);
    if (!over) return;

    if (active.data.current?.type === "list" && active.id !== over.id) {
      const oldIndex = lists.findIndex((l) => l.id === active.id);
      const newIndex = lists.findIndex((l) => l.id === over.id);
      reorderLists(oldIndex, newIndex);

      fetch("/api/lists/updateOrder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          boardId,
          lists: lists.map((l, i) => ({ id: l.id, order: i })),
        }),
      });
    }

    if (active.data.current?.type === "task") {
      const taskUpdates = lists.flatMap((list) =>
        list.tasks.map((task, i) => ({ id: task.id, order: i, listId: list.id })),
      );

      fetch("/api/tasks/updateOrder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: taskUpdates }),
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <BoardFilters
        filters={filters}
        onChange={setFilters}
        availableLabels={availableLabels}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={lists.map((l) => l.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex gap-4 overflow-x-auto pb-4 items-start">
            {filteredLists.map((list) => (
              <ListItem key={list.id} list={list} boardId={boardId} isOwner={isOwner} boardUsers={boardUsers} />
            ))}
            <CreateListForm boardId={boardId} />
          </div>
        </SortableContext>

        <DragOverlay>
          {activeTask && (
            <div className="bg-background rounded-lg px-3 py-2 shadow-md border text-sm rotate-2 opacity-95">
              {activeTask.title}
            </div>
          )}
          {activeList && (
            <div className="bg-muted rounded-xl w-64 p-3 shadow-md opacity-95">
              <h3 className="font-semibold text-sm">{activeList.title}</h3>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
