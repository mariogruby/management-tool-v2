import { sidebarRoutes } from "./SidebarRoutes.data";
import { SidebarItem } from "./SidebarItem/SidebarItem";

export function SidebarRoutes() {
  return (
    <div className="flex flex-col gap-1">
      {sidebarRoutes.map((item) => (
        <SidebarItem key={item.href} item={item} />
      ))}
    </div>
  );
}
