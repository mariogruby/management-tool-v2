"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Kanban, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBoardsStore } from "@/store/useBoardsStore";

export function BoardsSection() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const boards = useBoardsStore((s) => s.boards);

  return (
    <div className="flex flex-col gap-1">
      <div
        className={cn(
          "flex items-center rounded-md text-sm transition",
          pathname === "/dashboard/boards"
            ? "bg-muted font-medium"
            : "text-muted-foreground hover:bg-muted"
        )}
      >
        <Link
          href="/dashboard/boards"
          className="flex items-center gap-2 flex-1 px-3 py-2"
        >
          <Kanban size={18} />
          Boards
        </Link>
        <button
          onClick={() => setOpen((o) => !o)}
          className="pr-3 py-2 text-muted-foreground"
        >
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-0.5 pl-4">
          {boards.length === 0 && (
            <p className="text-xs text-muted-foreground px-3 py-1">
              Sin boards todavía
            </p>
          )}
          {boards.map((board) => {
            const isActive = pathname === `/board/${board.id}`;
            return (
              <Link
                key={board.id}
                href={`/board/${board.id}`}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition truncate",
                  isActive
                    ? "bg-muted font-medium"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {board.color && (
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: board.color }}
                  />
                )}
                <span className="truncate">{board.title}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
