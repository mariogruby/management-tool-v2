"use client";

import { Input } from "@/components/ui/input";
import { StepProps } from "../CreateBoardStepper.types";

export function StepBasicInfo({ data, onChange }: StepProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">
          Nombre <span className="text-destructive">*</span>
        </label>
        <Input
          placeholder="Mi proyecto"
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
          autoFocus
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-muted-foreground">
          Descripción <span className="text-xs">(opcional)</span>
        </label>
        <Input
          placeholder="¿Para qué es este board?"
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
        />
      </div>
    </div>
  );
}
