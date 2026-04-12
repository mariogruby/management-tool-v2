import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationBell } from "../NotificationBell/NotificationBell";
import { GlobalSearch } from "../GlobalSearch/GlobalSearch";

export function Navbar() {
  return (
    <header className="flex items-center justify-between h-14 px-4 border-b shrink-0">
      <SidebarTrigger />
      <GlobalSearch />
      <NotificationBell />
    </header>
  );
}
