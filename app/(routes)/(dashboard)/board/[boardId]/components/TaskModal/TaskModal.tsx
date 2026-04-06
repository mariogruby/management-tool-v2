"use client";

import { useRef, useState } from "react";
import { AlignLeft, CheckCircle2, Circle, Paperclip } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBoardStore } from "../../store/useBoardStore";
import { TaskDatePicker } from "../TaskDatePicker/TaskDatePicker";
import { TaskLabels } from "../TaskLabels/TaskLabels";
import { TaskComments } from "../TaskComments/TaskComments";
import { TaskAttachments, type TaskAttachmentsHandle } from "../TaskAttachments/TaskAttachments";
import type { LabelModel } from "@/lib/generated/prisma/models/Label";
import { TaskModalProps } from "./TaskModal.types";

export function TaskModal({
  task,
  listId,
  listTitle,
  boardId,
  open,
  onClose,
}: TaskModalProps) {
  const updateTask = useBoardStore((s) => s.updateTask);
  const attachmentsRef = useRef<TaskAttachmentsHandle>(null);

  const [title, setTitle] = useState(task.title);
  const [savedTitle, setSavedTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [savedDescription, setSavedDescription] = useState(
    task.description ?? "",
  );
  const [completed, setCompleted] = useState(task.completed);
  const [currentStartDate, setCurrentStartDate] = useState<Date | null>(
    task.startDate ?? null,
  );
  const [currentDueDate, setCurrentDueDate] = useState<Date | null>(
    task.dueDate ?? null,
  );
  const [activeLabels, setActiveLabels] = useState<{ label: LabelModel }[]>(
    task.labels,
  );
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
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
        <DialogHeader className="flex flex-row items-center px-4 py-4.5 border-b bg-muted/50">
          <DialogTitle className="text-sm font-medium text-muted-foreground">
            {listTitle}
          </DialogTitle>
        </DialogHeader>

        <div
          className="flex divide-x overflow-hidden"
          style={{ maxHeight: "70vh" }}
        >
          {/* Left — task details */}
          <div className="flex-1 overflow-y-auto px-4 pt-2 pb-6 flex flex-col gap-4">
            <div className="flex items-start gap-2">
              <button
                onClick={toggleCompleted}
                className="mt-4 shrink-0 text-muted-foreground hover:text-primary transition-colors"
              >
                {completed ? (
                  <CheckCircle2 size={20} className="text-primary" />
                ) : (
                  <Circle size={20} />
                )}
              </button>

              {editingTitle ? (
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => {
                    saveTitle();
                    setEditingTitle(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      saveTitle();
                      setEditingTitle(false);
                    }
                    if (e.key === "Escape") {
                      setTitle(savedTitle);
                      setEditingTitle(false);
                    }
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

            {/* Labels + Dates + Attachments row */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 flex-wrap">
                <TaskLabels
                  taskId={task.id}
                  boardId={boardId}
                  activeLabels={task.labels}
                  onLabelsChange={setActiveLabels}
                />
                {!currentStartDate && !currentDueDate && (
                  <TaskDatePicker
                    taskId={task.id}
                    listId={listId}
                    startDate={currentStartDate}
                    dueDate={currentDueDate}
                    onSaved={(s, d) => {
                      setCurrentStartDate(s);
                      setCurrentDueDate(d);
                    }}
                  />
                )}
                <Button
                  variant="outline"
                  onClick={() => attachmentsRef.current?.openFilePicker()}
                >
                  <Paperclip size={15} />
                  <span>Adjuntar</span>
                </Button>
              </div>

              {activeLabels.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {activeLabels.map(({ label }) => (
                    <Badge
                      key={label.id}
                      className="text-white font-medium"
                      style={{ backgroundColor: label.color }}
                    >
                      {label.title}
                    </Badge>
                  ))}
                </div>
              )}

              {(currentStartDate || currentDueDate) && (
                <TaskDatePicker
                  taskId={task.id}
                  listId={listId}
                  startDate={currentStartDate}
                  dueDate={currentDueDate}
                  hideTrigger
                  onSaved={(s, d) => {
                    setCurrentStartDate(s);
                    setCurrentDueDate(d);
                  }}
                />
              )}

              <TaskAttachments ref={attachmentsRef} taskId={task.id} />
            </div>

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
                    <Button
                      size="sm"
                      onClick={saveDescription}
                      disabled={loading}
                    >
                      Guardar
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setDescription(savedDescription);
                        setEditingDescription(false);
                      }}
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
                    <span className="text-muted-foreground">
                      Añade una descripción...
                    </span>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* Right — comments */}
          <div className="w-72 shrink-0 flex flex-col px-4 pt-2 pb-4 overflow-hidden">
            <TaskComments taskId={task.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
