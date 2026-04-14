import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationBell } from "../NotificationBell/NotificationBell";
import { GlobalSearch } from "../GlobalSearch/GlobalSearch";

export function Navbar() {
  return (
    <header className="flex items-center h-14 px-3 sm:px-4 border-b shrink-0 gap-2">
      <SidebarTrigger className="shrink-0" />
      <div className="flex-1 flex justify-center">
        <GlobalSearch />
      </div>
      <NotificationBell />
    </header>
  );
}
