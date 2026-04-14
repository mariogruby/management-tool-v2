"use client";

import { useState } from "react";
import Image from "next/image";
import { Settings } from "lucide-react";
import { UserSettingsModal } from "../UserSettingsModal/UserSettingsModal";

interface SidebarUserFooterProps {
  name: string | null;
  email: string;
  imageUrl: string | null;
}

export function SidebarUserFooter({ name, email, imageUrl }: SidebarUserFooterProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <UserSettingsModal open={open} onClose={() => setOpen(false)} />

      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2.5 w-full rounded-lg px-2 py-2 hover:bg-sidebar-accent transition-colors group text-left"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-muted flex items-center justify-center">
          {imageUrl ? (
            <Image src={imageUrl} alt={name ?? email} width={32} height={32} className="object-cover" />
          ) : (
            <span className="text-sm font-semibold text-muted-foreground">
              {(name ?? email).charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          {name && <p className="text-sm font-medium truncate">{name}</p>}
          <p className={`truncate text-muted-foreground ${name ? "text-xs" : "text-sm"}`}>{email}</p>
        </div>

        <Settings
          size={15}
          className="shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </button>
    </>
  );
}
