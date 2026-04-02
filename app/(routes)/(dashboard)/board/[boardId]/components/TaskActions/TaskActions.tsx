"use client";

import { useState } from "react";
import { MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBoardStore } from "../../store/useBoardStore";
import { TaskActionsProps } from "./TaskActions.types";

export function TaskActions({ taskId, listId }: TaskActionsProps) {
  const removeTask = useBoardStore((s) => s.removeTask);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await fetch(`/api/tasks/deleteTask/${taskId}`, { method: "DELETE" });
    removeTask(listId, taskId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="p-1 rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted transition"
        disabled={loading}
      >
        <MoreHorizontal size={14} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          variant="destructive"
          onClick={handleDelete}
          disabled={loading}
        >
          <Trash2 size={14} />
          Eliminar tarea
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
