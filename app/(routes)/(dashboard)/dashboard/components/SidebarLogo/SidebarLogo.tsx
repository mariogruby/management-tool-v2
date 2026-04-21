import Link from "next/link";
import { KikiLogo } from "@/components/Shared/KikiLogo/KikiLogo";

export function SidebarLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-bold text-lg px-2 py-0.5"
    >
      <KikiLogo size={20} />
      <span>Kiki</span>
    </Link>
  );
}
