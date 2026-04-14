"use client";

import { useEffect } from "react";

const STORAGE_KEY = "recent_boards";
const MAX = 4;

export function BoardVisitTracker({ boardId }: { boardId: string }) {
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const ids: string[] = raw ? JSON.parse(raw) : [];
      const next = [boardId, ...ids.filter((id) => id !== boardId)].slice(0, MAX);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // localStorage no disponible (SSR, incógnito estricto, etc.)
    }
  }, [boardId]);

  return null;
}
