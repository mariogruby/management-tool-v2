"use client";

import { useState } from "react";
import { MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useBoardStore } from "../../store/useBoardStore";
import { TaskActionsProps } from "./TaskActions.types";
import { ConfirmModal } from "@/components/Shared/ModalDeleteConfirmation/ModalDeleteConfirmation";

export function TaskActions({ taskId, listId }: TaskActionsProps) {
  const removeTask = useBoardStore((s) => s.removeTask);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await fetch(`/api/tasks/deleteTask/${taskId}`, { method: "DELETE" });
    if (res.ok) {
      removeTask(listId, taskId);
      toast.success("Tarea eliminada");
    } else {
      toast.error("Error al eliminar la tarea");
    }
    setLoading(false);
  };

  return (
    <>
    <ConfirmModal
      open={confirmDelete}
      title="Eliminar tarea"
      description="¿Eliminar esta tarea? Se perderán todos sus comentarios, adjuntos y subtareas."
      confirmLabel="Eliminar"
      loading={loading}
      onConfirm={handleDelete}
      onCancel={() => setConfirmDelete(false)}
    />
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
          onClick={() => setConfirmDelete(true)}
          disabled={loading}
        >
          <Trash2 size={14} />
          Eliminar tarea
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
}
