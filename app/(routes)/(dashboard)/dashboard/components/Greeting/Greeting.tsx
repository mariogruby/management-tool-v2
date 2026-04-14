"use client";

import { useEffect, useState } from "react";
import { GreetingProps } from "./Greeting.types";

function getGreeting(hour: number): string {
  if (hour >= 6 && hour < 13) return "Buenos días";
  if (hour >= 13 && hour < 20) return "Buenas tardes";
  return "Buenas noches";
}

export function Greeting({ name }: GreetingProps) {
  const [greeting, setGreeting] = useState<string | null>(null);
  const displayName = name?.split(" ")[0] ?? "usuario";

  useEffect(() => {
    const t = setTimeout(() => {
      setGreeting(getGreeting(new Date().getHours()));
    }, 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col gap-0.5">
      <h1 className="text-2xl font-bold">
        {greeting ? `${greeting}, ${displayName} 👋` : `Hola, ${displayName} 👋`}
      </h1>
      <p className="text-sm text-muted-foreground">
        Aquí tienes un resumen de tu actividad
      </p>
    </div>
  );
}
