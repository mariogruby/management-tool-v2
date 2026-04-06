"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

type InviteInfo = {
  email: string;
  boardTitle: string;
  status: string;
  expired: boolean;
};

export default function InvitePage() {
  const { token } = useParams<{ token: string }>();
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  const [info, setInfo] = useState<InviteInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    fetch(`/api/invite/${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setInfo(data);
      })
      .catch(() => setError("Error al cargar la invitación"))
      .finally(() => setLoading(false));
  }, [token]);

  const handleAccept = async () => {
    if (!isSignedIn) {
      router.push(`/sign-in?redirect_url=/invite/${token}`);
      return;
    }
    setAccepting(true);
    const res = await fetch(`/api/invite/${token}`, { method: "POST" });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
      setAccepting(false);
    } else {
      router.push(`/board/${data.boardId}`);
    }
  };

  if (loading || !isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-sm flex flex-col gap-4">
        {error ? (
          <>
            <h1 className="text-xl font-bold">Invitación no válida</h1>
            <p className="text-muted-foreground text-sm">{error}</p>
            <Button onClick={() => router.push("/dashboard/boards")}>
              Ir al inicio
            </Button>
          </>
        ) : info?.expired ? (
          <>
            <h1 className="text-xl font-bold">Invitación expirada</h1>
            <p className="text-muted-foreground text-sm">
              Esta invitación ha caducado. Pide al propietario del board que te envíe una nueva.
            </p>
          </>
        ) : info?.status !== "pending" ? (
          <>
            <h1 className="text-xl font-bold">Invitación ya usada</h1>
            <p className="text-muted-foreground text-sm">
              Esta invitación ya fue aceptada o cancelada.
            </p>
            <Button onClick={() => router.push("/dashboard/boards")}>
              Ir al inicio
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold">Invitación a board</h1>
            <p className="text-sm text-muted-foreground">
              Has sido invitado a colaborar en el board{" "}
              <strong className="text-foreground">"{info?.boardTitle}"</strong>.
            </p>
            {!isSignedIn && (
              <p className="text-xs text-muted-foreground">
                Necesitas iniciar sesión con <strong>{info?.email}</strong> para aceptar.
              </p>
            )}
            <Button onClick={handleAccept} disabled={accepting}>
              {accepting ? "Aceptando..." : "Aceptar invitación"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
