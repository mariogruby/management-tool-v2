import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export function HomeNavbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-8 h-16 border-b bg-background/80 backdrop-blur-sm">
      <Link href="/" className="flex items-center gap-2 font-bold text-lg">
        <LayoutDashboard size={20} className="text-primary" />
        Kiki
      </Link>

      <nav className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
        <Link
          href="#features"
          className="hover:text-foreground transition-colors"
        >
          Funciones
        </Link>
        <Link href="#stats" className="hover:text-foreground transition-colors">
          Estadísticas
        </Link>
      </nav>

      <div className="flex items-center gap-2">
        <Link href="/sign-in">
          <InteractiveHoverButton>Iniciar sesión</InteractiveHoverButton>
        </Link>
        <Link href="/sign-up">
          <InteractiveHoverButton>Registrarse</InteractiveHoverButton>
        </Link>
      </div>
    </header>
  );
}
