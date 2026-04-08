"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { TaskCardProps } from "./TaskCard.types";
import { TaskActions } from "../TaskActions/TaskActions";
import { TaskModal } from "../TaskModal/TaskModal";
import { useBoardStore } from "../../store/useBoardStore";

export function TaskCard({ task, listId, listTitle, boardId, isOwner, boardUsers }: TaskCardProps) {
  const updateTask = useBoardStore((s) => s.updateTask);
  const [modalOpen, setModalOpen] = useState(false);
  const [completed, setCompleted] = useState(task.completed);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: "task", task, listId },
    disabled: modalOpen,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  const toggleCompleted = async () => {
    const next = !completed;
    setCompleted(next);
    await fetch(`/api/tasks/updateTask/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: next }),
    });
    updateTask(listId, task.id, { completed: next });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group bg-background rounded-lg px-3 py-2 shadow-sm border text-sm cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors flex items-center gap-2"
    >
      <div
        onPointerDown={(e) => e.stopPropagation()}
        onClick={toggleCompleted}
        className="shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-primary transition-all cursor-pointer"
      >
        {completed ? <CheckCircle2 size={15} className="text-primary opacity-100" /> : <Circle size={15} />}
      </div>

      <span
        className={cn("flex-1 cursor-pointer", completed && "line-through text-muted-foreground")}
        onClick={() => setModalOpen(true)}
      >
        {task.title}
      </span>

      <div onPointerDown={(e) => e.stopPropagation()}>
        <TaskActions taskId={task.id} listId={listId} />
      </div>

      <TaskModal
        task={task}
        listId={listId}
        listTitle={listTitle}
        boardId={boardId}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        isOwner={isOwner}
        boardUsers={boardUsers}
      />
    </div>
  );
}
