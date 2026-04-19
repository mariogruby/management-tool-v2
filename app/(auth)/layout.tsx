import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-zinc-950 text-white overflow-hidden">
        {/* Gradient blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-125 h-125 rounded-full bg-white/5 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 rounded-full bg-white/5 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 rounded-full bg-white/3 blur-[100px]" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Logo */}
        <Link href="/" className="relative flex items-center gap-2 font-bold text-xl z-10">
          <LayoutDashboard size={22} className="text-violet-400" />
          Kiki
        </Link>

        {/* Center content */}
        <div className="relative z-10 flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/60">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Gestión de proyectos simplificada
          </div>

          <h1 className="text-4xl font-bold leading-tight">
            Organiza tu trabajo.
            <br />
            <span className="bg-linear-to-r from-violet-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Colabora sin fricciones.
            </span>
          </h1>

          <p className="text-white/50 text-base max-w-sm leading-relaxed">
            Boards, listas y tareas — todo en un solo lugar. Invita a tu equipo
            y lleva el control de cada proyecto en tiempo real.
          </p>

          {/* Feature list */}
          <ul className="flex flex-col gap-3 mt-2">
            {[
              "Boards con columnas personalizadas",
              "Asignación de tareas a tu equipo",
              "Seguimiento de progreso en tiempo real",
              "Actividad y comentarios centralizados",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-white/60">
                <span className="size-4 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4L3.5 6L6.5 2" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom quote */}
        <div className="relative z-10">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Kiki · Todos los derechos reservados
          </p>
        </div>
      </div>

      {/* Right panel - auth widget */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-background">
        {/* Mobile logo */}
        <Link href="/" className="lg:hidden flex items-center gap-2 font-bold text-xl mb-8">
          <LayoutDashboard size={20} className="text-primary" />
          Kiki
        </Link>

        {children}
      </div>
    </div>
  );
}
