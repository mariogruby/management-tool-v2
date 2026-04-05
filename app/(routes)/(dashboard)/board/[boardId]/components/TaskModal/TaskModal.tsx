"use client";

import { useState } from "react";
import { AlignLeft, CheckCircle2, Circle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBoardStore } from "../../store/useBoardStore";
import { TaskDatePicker } from "../TaskDatePicker/TaskDatePicker";
import { TaskModalProps } from "./TaskModal.types";

export function TaskModal({ task, listId, listTitle, open, onClose }: TaskModalProps) {
  const updateTask = useBoardStore((s) => s.updateTask);

  const [title, setTitle] = useState(task.title);
  const [savedTitle, setSavedTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [savedDescription, setSavedDescription] = useState(task.description ?? "");
  const [completed, setCompleted] = useState(task.completed);
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const saveTitle = async () => {
    const trimmed = title.trim();
    if (!trimmed || trimmed === savedTitle) {
      setTitle(savedTitle);
      return;
    }
    setLoading(true);
    await fetch(`/api/tasks/updateTask/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: trimmed }),
    });
    updateTask(listId, task.id, { title: trimmed });
    setSavedTitle(trimmed);
    setLoading(false);
  };

  const saveDescription = async () => {
    const trimmed = description.trim();
    if (trimmed === savedDescription) {
      setEditingDescription(false);
      return;
    }
    setLoading(true);
    await fetch(`/api/tasks/updateTask/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: trimmed }),
    });
    updateTask(listId, task.id, { description: trimmed || null });
    setSavedDescription(trimmed);
    setEditingDescription(false);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="flex flex-row items-center px-4 py-4.5 border-b bg-muted/50">
          <DialogTitle className="text-sm font-medium text-muted-foreground">
            {listTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="px-4 pt-0 pb-6 flex flex-col gap-4">
          <div className="flex items-start gap-2">
            <button
              onClick={toggleCompleted}
              className="mt-4 shrink-0 text-muted-foreground hover:text-primary transition-colors"
            >
              {completed ? <CheckCircle2 size={20} className="text-primary" /> : <Circle size={20} />}
            </button>

            {editingTitle ? (
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => { saveTitle(); setEditingTitle(false); }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { e.preventDefault(); saveTitle(); setEditingTitle(false); }
                  if (e.key === "Escape") { setTitle(savedTitle); setEditingTitle(false); }
                }}
                disabled={loading}
                autoFocus
                rows={1}
                className="w-full text-2xl font-bold px-2 py-2 rounded-md border-0 outline-none focus:ring-1 focus:ring-ring resize-none bg-muted/50"
              />
            ) : (
              <h2
                onClick={() => setEditingTitle(true)}
                className={`flex-1 text-2xl font-bold px-2 py-2 cursor-pointer hover:bg-muted/50 rounded-md transition-colors ${completed ? "line-through text-muted-foreground" : ""}`}
              >
                {savedTitle}
              </h2>
            )}
          </div>

          <TaskDatePicker
            taskId={task.id}
            listId={listId}
            startDate={task.startDate ?? null}
            dueDate={task.dueDate ?? null}
          />

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlignLeft size={15} />
              <span>Descripción</span>
            </div>

            {editingDescription ? (
              <div className="flex flex-col gap-2">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setDescription(savedDescription);
                      setEditingDescription(false);
                    }
                  }}
                  disabled={loading}
                  placeholder="Añade una descripción..."
                  rows={4}
                  autoFocus
                  className="w-full resize-none rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={saveDescription} disabled={loading}>
                    Guardar
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => { setDescription(savedDescription); setEditingDescription(false); }}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setEditingDescription(true)}
                className="min-h-16 w-full rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-muted transition-colors"
              >
                {savedDescription || (
                  <span className="text-muted-foreground">Añade una descripción...</span>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
