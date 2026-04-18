import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

export function HomeFooter() {
  return (
    <footer className="border-t px-4 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <Link
        href="/"
        className="flex items-center gap-2 font-semibold text-foreground"
      >
        <LayoutDashboard size={16} className="text-primary" />
        Kiki
      </Link>
      <p>
        © {new Date().getFullYear()} Kiki. Todos los derechos reservados.
      </p>
      <div className="flex items-center gap-4">
        <Link
          href="/sign-in"
          className="hover:text-foreground transition-colors"
        >
          Iniciar sesión
        </Link>
        <Link
          href="/sign-up"
          className="hover:text-foreground transition-colors"
        >
          Registrarse
        </Link>
      </div>
    </footer>
  );
}
