"use client";

import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ListItemProps } from "./ListItem.types";
import { TaskCard } from "../TaskCard/TaskCard";
import { CreateTaskForm } from "../CreateTaskForm/CreateTaskForm";
import { ListActions } from "../ListActions/ListActions";

export function ListItem({ list }: ListItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: list.id,
    data: { type: "list", list },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-col bg-muted rounded-xl w-64 shrink-0 p-3 gap-2"
    >
      <div
        className="flex items-center justify-between px-1 cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <h3 className="font-semibold text-sm">{list.title}</h3>
        <div
          className="flex items-center gap-1"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <span className="text-xs text-muted-foreground">{list.tasks.length}</span>
          <ListActions listId={list.id} />
        </div>
      </div>
      <SortableContext
        items={list.tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2">
          {list.tasks.map((task) => (
            <TaskCard key={task.id} task={task} listId={list.id} />
          ))}
        </div>
      </SortableContext>
      <CreateTaskForm listId={list.id} />
    </div>
  );
}
