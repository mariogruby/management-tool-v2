"use client";

import { useEffect, useState } from "react";
import { Users, Trash2, Mail, UserCheck, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Member = {
  id: string;
  role: string;
  user: { name: string | null; email: string };
};

type Invitation = {
  id: string;
  email: string;
  createdAt: string;
};

type Props = {
  boardId: string;
  open: boolean;
  onClose: () => void;
};

export function BoardMembers({ boardId, open, onClose }: Props) {
  const [members, setMembers] = useState<Member[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) return;
    fetch(`/api/boards/${boardId}/invitations`)
      .then((r) => r.json())
      .then((data) => {
        setMembers(data.members ?? []);
        setInvitations(data.invitations ?? []);
        setIsOwner(data.isOwner ?? false);
      });
  }, [open, boardId]);

  const handleInvite = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setError(null);
    setSuccess(false);

    const res = await fetch(`/api/boards/${boardId}/invitations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Error al enviar la invitación");
    } else {
      setInvitations((prev) => [data, ...prev]);
      setEmail("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
    setLoading(false);
  };

  const cancelInvitation = async (invitationId: string) => {
    setInvitations((prev) => prev.filter((i) => i.id !== invitationId));
    await fetch(`/api/boards/${boardId}/invitations/${invitationId}`, {
      method: "DELETE",
    });
  };

  const removeMember = async (memberId: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
    await fetch(`/api/boards/${boardId}/members/${memberId}`, {
      method: "DELETE",
    });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users size={18} />
            Miembros del board
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* Invite form — owner only */}
          {isOwner && <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Invitar por email</p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null); }}
                onKeyDown={(e) => e.key === "Enter" && handleInvite()}
                placeholder="correo@ejemplo.com"
                className="flex-1 rounded-md border bg-transparent px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
              />
              <Button size="sm" onClick={handleInvite} disabled={loading || !email.trim()}>
                {loading ? "..." : "Invitar"}
              </Button>
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
            {success && <p className="text-xs text-green-600">Invitación enviada</p>}
          </div>}

          {/* Members */}
          {members.length > 0 && (
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Miembros
              </p>
              {members.map((member) => (
                <div key={member.id} className="group flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted transition-colors">
                  <UserCheck size={15} className="text-green-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{member.user.name ?? member.user.email}</p>
                    {member.user.name && (
                      <p className="text-xs text-muted-foreground truncate">{member.user.email}</p>
                    )}
                  </div>
                  {isOwner && (
                    <button
                      onClick={() => removeMember(member.id)}
                      className="shrink-0 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Pending invitations */}
          {invitations.length > 0 && (
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Invitaciones pendientes
              </p>
              {invitations.map((inv) => (
                <div key={inv.id} className="group flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted transition-colors">
                  <Clock size={15} className="text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{inv.email}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Mail size={10} /> Pendiente
                    </p>
                  </div>
                  <button
                    onClick={() => cancelInvitation(inv.id)}
                    className="shrink-0 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {members.length === 0 && invitations.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-2">
              No hay miembros ni invitaciones aún.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
