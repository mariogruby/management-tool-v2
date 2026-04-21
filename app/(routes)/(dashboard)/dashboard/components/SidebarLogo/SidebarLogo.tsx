import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

export function SidebarLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-bold text-lg px-2 py-0.5"
    >
      <LayoutDashboard size={20} className="text-primary shrink-0" />
      <span>Kiki</span>
    </Link>
  );
}
