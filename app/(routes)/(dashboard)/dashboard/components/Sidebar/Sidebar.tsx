import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SidebarRoutes } from "../SidebarRoutes/SidebarRoutes";
import { SidebarItem } from "../SidebarRoutes/SidebarItem/SidebarItem";
import { Settings } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarRoutes />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarItem item={{ label: "Settings", href: "/dashboard/settings", icon: <Settings size={18} /> }} />
      </SidebarFooter>
    </Sidebar>
  );
}
