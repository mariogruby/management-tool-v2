import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationBell } from "../NotificationBell/NotificationBell";

export function Navbar() {
  return (
    <header className="flex items-center justify-between h-14 px-4 border-b shrink-0">
      <SidebarTrigger />
      <NotificationBell />
    </header>
  );
}
