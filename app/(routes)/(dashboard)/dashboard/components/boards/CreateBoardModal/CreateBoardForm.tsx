"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CreateBoardFormProps {
  onSuccess: () => void;
}

export function CreateBoardForm({ onSuccess }: CreateBoardFormProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCreate = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/boards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: name }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al crear el board");
        return;
      }

      setName("");
      onSuccess();
      router.refresh();
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 pt-2">
      <Input
        placeholder="Nombre del board"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !loading && name.trim() && handleCreate()}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button onClick={handleCreate} disabled={!name.trim() || loading}>
        {loading ? "Creando..." : "Crear"}
      </Button>
    </div>
  );
}
