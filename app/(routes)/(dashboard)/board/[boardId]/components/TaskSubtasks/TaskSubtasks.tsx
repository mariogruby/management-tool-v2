"use client";

import { useEffect, useRef, useState } from "react";
import { CheckSquare2, Plus, Trash2, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Subtask, TaskSubtasksProps } from "./TaskSubtasks.types";

export function TaskSubtasks({ taskId }: TaskSubtasksProps) {
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`/api/tasks/${taskId}/subtasks`)
      .then((r) => r.json())
      .then((data) => setSubtasks(Array.isArray(data) ? data : []));
  }, [taskId]);

  useEffect(() => {
    if (adding) setTimeout(() => inputRef.current?.focus(), 0);
  }, [adding]);

  const completed = subtasks.filter((s) => s.completed).length;
  const total = subtasks.length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  const addSubtask = async () => {
    if (!newTitle.trim()) {
      setAdding(false);
      return;
    }
    const res = await fetch(`/api/tasks/${taskId}/subtasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle.trim() }),
    });
    if (res.ok) {
      const subtask = await res.json();
      setSubtasks((prev) => [...prev, subtask]);
    }
    setNewTitle("");
    setAdding(false);
  };

  const toggleCompleted = async (subtask: Subtask) => {
    const next = !subtask.completed;
    setSubtasks((prev) =>
      prev.map((s) => (s.id === subtask.id ? { ...s, completed: next } : s)),
    );
    await fetch(`/api/tasks/${taskId}/subtasks/${subtask.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: next }),
    });
  };

  const startEdit = (subtask: Subtask) => {
    setEditingId(subtask.id);
    setEditingTitle(subtask.title);
  };

  const saveEdit = async (id: string) => {
    if (!editingTitle.trim()) {
      setEditingId(null);
      return;
    }
    setSubtasks((prev) =>
      prev.map((s) => (s.id === id ? { ...s, title: editingTitle.trim() } : s)),
    );
    setEditingId(null);
    await fetch(`/api/tasks/${taskId}/subtasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editingTitle.trim() }),
    });
  };

  const deleteSubtask = async (id: string) => {
    setSubtasks((prev) => prev.filter((s) => s.id !== id));
    await fetch(`/api/tasks/${taskId}/subtasks/${id}`, { method: "DELETE" });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CheckSquare2 size={15} />
        <span>Subtareas</span>
        {total > 0 && (
          <span className="ml-auto text-xs">
            {completed}/{total}
          </span>
        )}
      </div>

      {total > 0 && (
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="flex flex-col gap-1">
        {subtasks.map((subtask) => (
          <div
            key={subtask.id}
            className="group flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted/50 transition-colors"
          >
            <Checkbox
              checked={subtask.completed}
              onCheckedChange={() => toggleCompleted(subtask)}
              className="shrink-0"
            />

            {editingId === subtask.id ? (
              <input
                autoFocus
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                onBlur={() => saveEdit(subtask.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit(subtask.id);
                  if (e.key === "Escape") setEditingId(null);
                }}
                className="flex-1 text-sm bg-transparent outline-none border-b border-border"
              />
            ) : (
              <span
                onClick={() => startEdit(subtask)}
                className={cn(
                  "flex-1 text-sm cursor-pointer",
                  subtask.completed && "line-through text-muted-foreground",
                )}
              >
                {subtask.title}
              </span>
            )}

            <button
              onClick={() => deleteSubtask(subtask.id)}
              className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}

        {adding ? (
          <div className="flex items-center gap-2 px-2">
            <div className="w-4 shrink-0" />
            <Input
              ref={inputRef}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addSubtask();
                if (e.key === "Escape") {
                  setAdding(false);
                  setNewTitle("");
                }
              }}
              placeholder="Nueva subtarea..."
              className="h-7 text-sm flex-1"
            />
            <Button size="sm" onClick={addSubtask} disabled={!newTitle.trim()}>
              Añadir
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={() => {
                setAdding(false);
                setNewTitle("");
              }}
            >
              <X size={13} />
            </Button>
          </div>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
          >
            <Plus size={13} />
            Añadir subtarea
          </button>
        )}
      </div>
    </div>
  );
}
