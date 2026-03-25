import { SidebarTrigger } from "@/components/ui/sidebar";

export function Navbar() {
  return (
    <header className="flex items-center h-14 px-4 border-b shrink-0">
      <SidebarTrigger />
    </header>
  );
}
