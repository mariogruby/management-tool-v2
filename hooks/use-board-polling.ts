"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const POLL_INTERVAL = 25_000; // 25 segundos

export function useBoardPolling() {
  const router = useRouter();

  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState === "visible") {
        router.refresh();
      }
    };

    const interval = setInterval(refresh, POLL_INTERVAL);

    // También refresca cuando el usuario vuelve a la pestaña
    document.addEventListener("visibilitychange", refresh);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [router]);
}
