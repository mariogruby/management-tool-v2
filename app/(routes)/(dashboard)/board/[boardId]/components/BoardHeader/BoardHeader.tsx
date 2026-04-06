"use client";

import { useRef, useState } from "react";
import { MoreHorizontal, Trash2, Pencil, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useBoardsStore } from "@/store/useBoardsStore";
import { useRouter } from "next/navigation";
import { BoardHeaderProps } from "./BoardHeader.types";
import { BoardMembers } from "../BoardMembers/BoardMembers";

export function BoardHeader({ boardId, title }: BoardHeaderProps) {
  const router = useRouter();
  const renameBoard = useBoardsStore((s) => s.renameBoard);
  const removeBoard = useBoardsStore((s) => s.removeBoard);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);
  const [savedTitle, setSavedTitle] = useState(title);
  const [loading, setLoading] = useState(false);
  const [membersOpen, setMembersOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const startEditing = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const cancelEditing = () => {
    setValue(savedTitle);
    setIsEditing(false);
  };

  const save = async () => {
    const trimmed = value.trim();
    if (!trimmed || trimmed === savedTitle) {
      cancelEditing();
      return;
    }
    setLoading(true);
    await fetch(`/api/boards/updateBoard/${boardId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: trimmed }),
    });
    renameBoard(boardId, trimmed);
    setSavedTitle(trimmed);
    setIsEditing(false);
    setLoading(false);
    router.refresh();
  };

  const handleDelete = async () => {
    setLoading(true);
    await fetch(`/api/boards/deleteBoard/${boardId}`, { method: "DELETE" });
    removeBoard(boardId);
    router.push("/dashboard/boards");
  };

  return (
    <>
      <BoardMembers
        boardId={boardId}
        open={membersOpen}
        onClose={() => setMembersOpen(false)}
      />

      <div className="flex items-center justify-between gap-4">
        {isEditing ? (
          <Input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") cancelEditing();
            }}
            disabled={loading}
            className="text-2xl font-bold w-auto rounded-xl"
            autoFocus
          />
        ) : (
          <h1
            className="text-2xl font-bold cursor-pointer hover:opacity-75 transition-opacity"
            onClick={startEditing}
          >
            {value}
          </h1>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMembersOpen(true)}
            disabled={loading}
          >
            <Users size={15} />
            Miembros
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              className="p-1.5 rounded-md text-muted-foreground hover:bg-muted transition"
              disabled={loading}
            >
              <MoreHorizontal size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={startEditing} className="cursor-pointer">
                <Pencil size={14} />
                Renombrar board
              </DropdownMenuItem>
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
        </div>
      </div>
    </>
  );
}
