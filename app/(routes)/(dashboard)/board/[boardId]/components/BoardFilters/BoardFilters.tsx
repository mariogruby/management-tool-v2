"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BoardFiltersProps, FilterDueDate, FilterStatus } from "./BoardFilters.types";

const STATUS_OPTIONS: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "pending", label: "Pendientes" },
  { value: "completed", label: "Completadas" },
];

const DUE_OPTIONS: { value: FilterDueDate; label: string }[] = [
  { value: "all", label: "Cualquier fecha" },
  { value: "overdue", label: "Vencidas" },
  { value: "today", label: "Hoy" },
  { value: "week", label: "Esta semana" },
  { value: "none", label: "Sin fecha" },
];

export function BoardFilters({ filters, onChange, availableLabels }: BoardFiltersProps) {
  const hasActiveFilters =
    filters.status !== "all" ||
    filters.dueDate !== "all" ||
    filters.labelIds.length > 0;

  const toggleLabel = (id: string) => {
    const next = filters.labelIds.includes(id)
      ? filters.labelIds.filter((l) => l !== id)
      : [...filters.labelIds, id];
    onChange({ ...filters, labelIds: next });
  };

  const reset = () => onChange({ status: "all", dueDate: "all", labelIds: [] });

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Status */}
      <ToggleGroup
        value={[filters.status]}
        onValueChange={(val: string[]) => {
          const next = val.find((v) => v !== filters.status) ?? filters.status;
          onChange({ ...filters, status: next as FilterStatus });
        }}
        className="border rounded-full"
      >
        {STATUS_OPTIONS.map((opt) => (
          <ToggleGroupItem key={opt.value} value={opt.value} className="text-xs h-8 px-3">
            {opt.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {/* Due date */}
      <Select
        value={filters.dueDate}
        onValueChange={(val) => onChange({ ...filters, dueDate: val as FilterDueDate })}
      >
        <SelectTrigger className="h-8 text-xs w-auto min-w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {DUE_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} className="text-xs">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Labels */}
      {availableLabels.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {availableLabels.map((label) => {
            const active = filters.labelIds.includes(label.id);
            return (
              <Badge
                key={label.id}
                onClick={() => toggleLabel(label.id)}
                className={`cursor-pointer text-white transition-opacity text-xs ${
                  active ? "opacity-100 ring-2 ring-offset-1 ring-ring" : "opacity-45 hover:opacity-70"
                }`}
                style={{ backgroundColor: label.color }}
              >
                {label.title || "Sin nombre"}
              </Badge>
            );
          })}
        </div>
      )}

      {/* Reset */}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={reset} className="h-8 text-xs gap-1 text-muted-foreground">
          <X size={12} />
          Limpiar
        </Button>
      )}
    </div>
  );
}
