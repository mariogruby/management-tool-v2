"use client";

import { useEffect } from "react";
import { X, LogOut } from "lucide-react";
import { UserProfile, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface UserSettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export function UserSettingsModal({ open, onClose }: UserSettingsModalProps) {
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const handleSignOut = () => {
    signOut(() => router.push("/"));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-10 max-h-[90vh] overflow-auto rounded-xl shadow-2xl">
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-destructive hover:bg-muted transition-colors"
            aria-label="Sign out"
          >
            <LogOut size={13} />
            Cerrar sesión
          </button>
          <button
            onClick={onClose}
            className="rounded-full bg-background/80 p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <UserProfile routing="hash" />
      </div>
    </div>
  );
}
