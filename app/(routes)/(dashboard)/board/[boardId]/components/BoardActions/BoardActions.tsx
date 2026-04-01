"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBoardsStore } from "@/store/useBoardsStore";
import { BoardActionsProps } from "./BoardActions.types";

export function BoardActions({ boardId }: BoardActionsProps) {
  const router = useRouter();
  const removeBoard = useBoardsStore((s) => s.removeBoard);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await fetch(`/api/boards/deleteBoard/${boardId}`, { method: "DELETE" });
    removeBoard(boardId);
    router.push("/dashboard/boards");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="p-1.5 rounded-md text-muted-foreground hover:bg-muted transition"
        disabled={loading}
      >
        <MoreHorizontal size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          variant="destructive"
          onClick={handleDelete}
          disabled={loading}
        >
          <Trash2 size={14} />
          Eliminar board
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
