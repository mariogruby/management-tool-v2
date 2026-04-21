"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useBoardStore } from "../../store/useBoardStore";
import { TaskDatePickerProps } from "./TaskDatePicker.types";

export function TaskDatePicker({
  taskId,
  listId,
  startDate,
  dueDate,
  hideTrigger = false,
  onSaved,
}: TaskDatePickerProps) {
  const updateTask = useBoardStore((s) => s.updateTask);

  const [open, setOpen] = useState(false);

  const [startEnabled, setStartEnabled] = useState(!!startDate);
  const [start, setStart] = useState<Date | undefined>(startDate ?? undefined);

  const [dueEnabled, setDueEnabled] = useState(!!dueDate);
  const [due, setDue] = useState<Date | undefined>(dueDate ?? undefined);
  const [dueHour, setDueHour] = useState(
    dueDate ? String(dueDate.getHours()).padStart(2, "0") : "23",
  );
  const [dueMinute, setDueMinute] = useState(
    dueDate ? String(dueDate.getMinutes()).padStart(2, "0") : "59",
  );

  const [selecting, setSelecting] = useState<"start" | "due">(dueDate && !startDate ? "due" : "start");

  const buildDueWithTime = (day: Date | undefined) => {
    if (!day) return undefined;
    const d = new Date(day);
    d.setHours(Number(dueHour), Number(dueMinute), 0, 0);
    return d;
  };

  const handleSave = async () => {
    const finalStart = startEnabled ? start : undefined;
    const finalDue = dueEnabled ? buildDueWithTime(due) : undefined;

    await fetch(`/api/tasks/updateTask/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate: finalStart?.toISOString() ?? null,
        dueDate: finalDue?.toISOString() ?? null,
      }),
    });
    updateTask(listId, taskId, {
      startDate: finalStart ?? null,
      dueDate: finalDue ?? null,
    });
    onSaved?.(finalStart ?? null, finalDue ?? null);
    setOpen(false);
  };

  const dateSummary = (
    <span className="flex items-center gap-1.5">
      {startEnabled && start ? format(start, "d MMM", { locale: es }) : ""}
      {startEnabled && start && dueEnabled && due ? " → " : ""}
      {dueEnabled && due
        ? format(buildDueWithTime(due)!, "d MMM yyyy HH:mm", { locale: es })
        : ""}
    </span>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {hideTrigger ? (
        <PopoverTrigger render={
          <button className="flex items-center gap-1.5 text-md text-muted-foreground hover:text-foreground transition-colors px-1 py-0.5 rounded-md hover:bg-muted">
            <CalendarDays size={15} />
            {dateSummary}
          </button>
        } />
      ) : (
        <PopoverTrigger render={
          <Button variant="outline">
            <CalendarDays size={15} />
            <span>Fechas</span>
          </Button>
        } />
      )}

      <PopoverContent className="flex flex-col gap-4 rounded-xl border bg-popover p-4 shadow-md w-fit">
        {/* Tabs */}
        <div className="flex gap-2 text-sm">
          <button
            onClick={() => setSelecting("start")}
            className={`px-3 py-1.5 rounded-md transition-colors ${selecting === "start" ? "bg-muted font-medium" : "text-muted-foreground hover:bg-muted"}`}
          >
            Fecha inicio
          </button>
          <button
            onClick={() => setSelecting("due")}
            className={`px-3 py-1.5 rounded-md transition-colors ${selecting === "due" ? "bg-muted font-medium" : "text-muted-foreground hover:bg-muted"}`}
          >
            Fecha vencimiento
          </button>
        </div>

        {/* Calendar */}
        <Calendar
          mode="single"
          selected={selecting === "start" ? start : due}
          onDayClick={(day) => {
            if (selecting === "start") setStart(day);
            else setDue(day);
          }}
          initialFocus
        />

        {/* Start date checkbox */}
        {selecting === "start" && (
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={startEnabled}
              onChange={(e) => setStartEnabled(e.target.checked)}
              className="rounded"
            />
            Incluir fecha de inicio
            {startEnabled && start && (
              <span className="text-muted-foreground ml-1">
                ({format(start, "d MMM yyyy", { locale: es })})
              </span>
            )}
          </label>
        )}

        {/* Due date checkbox + time */}
        {selecting === "due" && (
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={dueEnabled}
                onChange={(e) => setDueEnabled(e.target.checked)}
                className="rounded"
              />
              Incluir fecha de vencimiento
              {dueEnabled && due && (
                <span className="text-muted-foreground ml-1">
                  ({format(due, "d MMM yyyy", { locale: es })})
                </span>
              )}
            </label>

            {dueEnabled && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Hora:</span>
                <input
                  type="time"
                  value={`${dueHour}:${dueMinute}`}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!val) return;
                    const [h, m] = val.split(":");
                    if (h) setDueHour(h.padStart(2, "0"));
                    if (m) setDueMinute(m.padStart(2, "0"));
                  }}
                  className="rounded-md border bg-transparent px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 justify-end">
          <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button size="sm" onClick={handleSave}>
            Guardar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
