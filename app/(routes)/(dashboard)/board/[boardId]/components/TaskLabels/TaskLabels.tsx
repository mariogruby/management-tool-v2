"use client";

import { useEffect, useState } from "react";
import { Tag, Pencil, Trash2, Check } from "lucide-react";

import type { LabelModel } from "@/lib/generated/prisma/models/Label";
import { TaskLabelsProps } from "./TaskLabels.types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";

const PRESET_COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#6b7280",
  "#14b8a6",
];

export function TaskLabels({ taskId, boardId, activeLabels, onLabelsChange }: TaskLabelsProps) {
  const [open, setOpen] = useState(false);
  const [labels, setLabels] = useState<LabelModel[]>([]);
  const [activeIds, setActiveIds] = useState<Set<string>>(
    new Set(activeLabels.map((l) => l.label.id)),
  );

  // Form for creating/editing
  const [editingLabel, setEditingLabel] = useState<LabelModel | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formColor, setFormColor] = useState(PRESET_COLORS[0]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!open) return;
    fetch(`/api/labels/${boardId}`)
      .then((r) => r.json())
      .then(setLabels);
  }, [open, boardId]);

  const toggleLabel = async (labelId: string) => {
    const next = new Set(activeIds);
    next.has(labelId) ? next.delete(labelId) : next.add(labelId);
    setActiveIds(next);
    if (onLabelsChange) {
      const nextActive = labels
        .filter((l) => next.has(l.id))
        .map((l) => ({ label: l }));
      onLabelsChange(nextActive);
    }

    await fetch(`/api/tasks/${taskId}/labels`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ labelId }),
    });
  };

  const openCreate = () => {
    setEditingLabel(null);
    setFormTitle("");
    setFormColor(PRESET_COLORS[0]);
    setShowForm(true);
  };

  const openEdit = (label: LabelModel) => {
    setEditingLabel(label);
    setFormTitle(label.title);
    setFormColor(label.color);
    setShowForm(true);
  };

  const saveLabel = async () => {
    if (editingLabel) {
      const res = await fetch(`/api/labels/label/${editingLabel.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: formTitle, color: formColor }),
      });
      const updated = await res.json();
      setLabels((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    } else {
      const res = await fetch(`/api/labels/${boardId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: formTitle, color: formColor }),
      });
      const created = await res.json();
      setLabels((prev) => [...prev, created]);
    }
    setShowForm(false);
  };

  const deleteLabel = async (labelId: string) => {
    await fetch(`/api/labels/label/${labelId}`, { method: "DELETE" });
    const nextLabels = labels.filter((l) => l.id !== labelId);
    setLabels(nextLabels);
    const nextIds = new Set(activeIds);
    nextIds.delete(labelId);
    setActiveIds(nextIds);
    if (onLabelsChange) {
      onLabelsChange(nextLabels.filter((l) => nextIds.has(l.id)).map((l) => ({ label: l })));
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button variant="outline">
            <Tag size={15} />
            <span>Etiquetas</span>
            {/* {activeIds.size > 0 && (
              <div className="flex gap-1">
                {labels
                  .filter((l) => activeIds.has(l.id))
                  .map((l) => (
                    <span
                      key={l.id}
                      className="h-4 w-8 rounded-sm text-[10px] text-white px-1 flex items-center"
                      style={{ backgroundColor: l.color }}
                    >
                      {l.title ? l.title.slice(0, 4) : ""}
                    </span>
                  ))}
              </div>
            )} */}
          </Button>
        }
      />

      <PopoverContent className="flex flex-col gap-2 rounded-xl border bg-popover p-3 shadow-md w-64">
        {!showForm ? (
          <>
            <p className="text-xs font-medium text-muted-foreground px-1">
              Etiquetas
            </p>

            <div className="flex flex-col gap-1">
              {labels.map((label) => (
                <div key={label.id} className="flex items-center gap-2">
                  <button
                    onClick={() => toggleLabel(label.id)}
                    className="flex items-center gap-2 flex-1 min-w-0"
                  >
                    <Checkbox
                      checked={activeIds.has(label.id)}
                      readOnly
                      className="shrink-0 pointer-events-none"
                    />
                    <span
                      className="h-8 flex-1 rounded-sm text-xs text-white px-2 flex items-center font-medium truncate"
                      style={{ backgroundColor: label.color }}
                    >
                      {label.title}
                    </span>
                  </button>
                  <button
                    onClick={() => openEdit(label)}
                    className="p-1 rounded-md text-muted-foreground hover:bg-muted transition-colors shrink-0"
                  >
                    <Pencil size={13} />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={openCreate}
              className="mt-1 w-full rounded-md border border-dashed py-1.5 text-xs text-muted-foreground hover:bg-muted transition-colors"
            >
              + Crear etiqueta
            </button>
          </>
        ) : (
          <>
            <p className="text-xs font-medium text-muted-foreground px-1">
              {editingLabel ? "Editar etiqueta" : "Nueva etiqueta"}
            </p>

            {/* Color preview */}
            <div
              className="h-8 w-full rounded-md flex items-center px-3 text-sm font-medium text-white"
              style={{ backgroundColor: formColor }}
            >
              {formTitle || " "}
            </div>

            {/* Title input */}
            <input
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="Título (opcional)"
              className="w-full rounded-md border bg-transparent px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-ring"
            />

            {/* Color picker */}
            <div className="grid grid-cols-5 gap-1.5">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setFormColor(c)}
                  className="h-7 w-full rounded-md transition-transform hover:scale-110"
                  style={{ backgroundColor: c }}
                >
                  {formColor === c && (
                    <Check size={12} className="mx-auto text-white" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-2 mt-1">
              <button
                onClick={saveLabel}
                className="flex-1 rounded-md bg-primary text-primary-foreground py-1.5 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Guardar
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 rounded-md border py-1.5 text-sm hover:bg-muted transition-colors"
              >
                Cancelar
              </button>
            </div>

            {editingLabel && (
              <button
                onClick={() => {
                  deleteLabel(editingLabel.id);
                  setShowForm(false);
                }}
                className="flex items-center justify-center gap-1 text-xs text-destructive hover:bg-destructive/10 rounded-md py-1.5 transition-colors"
              >
                <Trash2 size={12} />
                Eliminar etiqueta
              </button>
            )}
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
