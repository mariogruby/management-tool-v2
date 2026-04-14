"use client";

import { useMemo } from "react";
import { GreetingProps } from "./Greeting.types";

function getGreeting(hour: number): string {
  if (hour >= 6 && hour < 13) return "Buenos días";
  if (hour >= 13 && hour < 20) return "Buenas tardes";
  return "Buenas noches";
}

export function Greeting({ name }: GreetingProps) {
  const greeting = useMemo(() => getGreeting(new Date().getHours()), []);
  const displayName = name?.split(" ")[0] ?? "usuario";

  return (
    <div className="flex flex-col gap-0.5">
      <h1 className="text-2xl font-bold">
        {greeting}, {displayName} 👋
      </h1>
      <p className="text-sm text-muted-foreground">
        Aquí tienes un resumen de tu actividad
      </p>
    </div>
  );
}
