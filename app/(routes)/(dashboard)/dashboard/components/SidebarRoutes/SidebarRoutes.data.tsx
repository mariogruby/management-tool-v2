import { SidebarItemsProps } from "./SidebarItem/SidebarItem.types"
import { Home, Kanban, Settings } from "lucide-react"

export const sidebarRoutes: SidebarItemsProps[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: <Home size={18} />
    },
    {
        label: "Boards",
        href: "/dashboard/boards",
        icon: <Kanban size={18} />
    },
    {
        label: "Settings",
        href: "/dashboard/settings",
        icon: <Settings size={18} />
    },
]