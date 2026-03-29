import { sidebarRoutes } from "./SidebarRoutes.data";
import { SidebarItem } from "./SidebarItem/SidebarItem";
import { BoardsSection } from "./BoardsSection/BoardsSection";

export function SidebarRoutes() {
  return (
    <div className="flex flex-col gap-1">
      {sidebarRoutes.map((item) => (
        <SidebarItem key={item.href} item={item} />
      ))}
      <BoardsSection />
    </div>
  );
}
