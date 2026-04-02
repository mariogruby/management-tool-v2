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
import { ListActionsProps } from "./ListActions.types";

export function ListActions({ listId }: ListActionsProps) {
  const removeList = useBoardStore((s) => s.removeList);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await fetch(`/api/lists/deleteList/${listId}`, { method: "DELETE" });
    removeList(listId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="p-1 rounded-md text-muted-foreground hover:bg-background transition"
        disabled={loading}
      >
        <MoreHorizontal size={15} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          variant="destructive"
          onClick={handleDelete}
          disabled={loading}
        >
          <Trash2 size={14} />
          Eliminar lista
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
