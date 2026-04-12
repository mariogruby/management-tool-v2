"use client";

import { useState } from "react";
import { Flag } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  PRIORITIES,
  getPriority,
  TaskPriorityProps,
  type Priority,
} from "./TaskPriority.constants";

export function TaskPriority({ taskId, priority, onSaved }: TaskPriorityProps) {
  const [open, setOpen] = useState(false);
  const current = getPriority(priority);

  const select = async (value: Priority | null) => {
    setOpen(false);
    onSaved(value);
    await fetch(`/api/tasks/updateTask/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priority: value }),
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className={cn(current && current.bg, "gap-1.5")}
          >
            <Flag size={13} />
            {current ? current.label : "Prioridad"}
          </Button>
        }
      />
      <PopoverContent className="w-44 p-1 flex flex-col gap-0.5">
        {PRIORITIES.map((p) => (
          <button
            key={p.value}
            onClick={() => select(p.value)}
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors hover:bg-muted w-full text-left",
              priority === p.value && "font-medium",
            )}
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: p.color }}
            />
            {p.label}
          </button>
        ))}
        {priority && (
          <>
            <div className="h-px bg-border my-0.5" />
            <button
              onClick={() => select(null)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:bg-muted w-full text-left transition-colors"
            >
              Quitar prioridad
            </button>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
